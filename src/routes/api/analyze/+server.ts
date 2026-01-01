import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { ANTHROPIC_API_KEY } from '$env/static/private';
import Anthropic from '@anthropic-ai/sdk';
import type { ScoreCard } from '$lib/types';

const client = new Anthropic({
	apiKey: ANTHROPIC_API_KEY
});

// Rate limiting: 35 requests per day per IP
const DAILY_LIMIT = 35;
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function getRateLimitInfo(ip: string): { allowed: boolean; remaining: number; resetTime: number } {
	const now = Date.now();
	const record = rateLimitMap.get(ip);

	// If no record or past reset time, create new record
	if (!record || now > record.resetTime) {
		const resetTime = now + 24 * 60 * 60 * 1000; // 24 hours from now
		rateLimitMap.set(ip, { count: 1, resetTime });
		return { allowed: true, remaining: DAILY_LIMIT - 1, resetTime };
	}

	// Check if under limit
	if (record.count < DAILY_LIMIT) {
		record.count++;
		rateLimitMap.set(ip, record);
		return { allowed: true, remaining: DAILY_LIMIT - record.count, resetTime: record.resetTime };
	}

	// Over limit
	return { allowed: false, remaining: 0, resetTime: record.resetTime };
}

function getClientIP(request: Request): string {
	// Check common headers for real IP (behind proxies)
	const forwarded = request.headers.get('x-forwarded-for');
	if (forwarded) {
		return forwarded.split(',')[0].trim();
	}
	const realIP = request.headers.get('x-real-ip');
	if (realIP) {
		return realIP;
	}
	// Fallback
	return 'unknown';
}

const SYSTEM_PROMPT = `You are a brutally honest startup advisor who has reviewed thousands of pitch decks. You give direct, specific feedback - not hedged corporate speak.

Your job is to evaluate startup ideas on 4 dimensions:
1. Problem Clarity (0-100): Do they know who has this problem and how badly?
2. Market Size (0-100): Is this a $10M market or a $10B market?
3. Competition (0-100): Are they walking into a bloodbath or a blue ocean?
4. Execution (0-100): Can a small team ship an MVP in 8 weeks?

You also give a YC verdict:
- YES: This fits YC's thesis. Apply.
- MAYBE: Interesting but needs one big unlock.
- PASS: Not a VC-scale business. Could still be great.

Most importantly, you provide ONE killer insight - the most important thing about this idea. This should be specific and memorable, like:
- "Your real competitor isn't [X], it's Excel spreadsheets."
- "This is a feature, not a company. Who's the platform?"
- "The timing is perfect. Three trends converging in your favor."

Your tone is:
- Direct, not mean
- Specific, not generic
- Constructive, not deflating
- Confident, not hedging

Even a 34/100 should make the user think "damn, they're right" not "this is bullshit."`;

const USER_PROMPT = (idea: string) => `Evaluate this startup idea:

"${idea}"

Respond in this exact JSON format:
{
  "overallScore": <number 0-100>,
  "verdict": "<one short sentence summarizing the idea's potential>",
  "dimensions": {
    "problemClarity": <number 0-100>,
    "marketSize": <number 0-100>,
    "competition": <number 0-100>,
    "execution": <number 0-100>
  },
  "ycVerdict": "<YES|MAYBE|PASS>",
  "ycReason": "<one sentence explaining the YC verdict>",
  "killerInsight": "<one memorable, specific insight about this idea>",
  "weakestArea": "<problemClarity|marketSize|competition|execution>"
}

Be brutally honest. Most ideas score 40-70. Only exceptional ideas score 80+. Terrible ideas can score below 30.`;

export const POST: RequestHandler = async ({ request }) => {
	try {
		// Rate limiting
		const clientIP = getClientIP(request);
		const rateLimit = getRateLimitInfo(clientIP);

		if (!rateLimit.allowed) {
			const hoursUntilReset = Math.ceil((rateLimit.resetTime - Date.now()) / (1000 * 60 * 60));
			return json(
				{
					error: `Daily limit reached (${DAILY_LIMIT}/day). Try again in ${hoursUntilReset} hour${hoursUntilReset > 1 ? 's' : ''}.`,
					rateLimited: true,
					remaining: 0,
					resetTime: rateLimit.resetTime
				},
				{
					status: 429,
					headers: {
						'X-RateLimit-Limit': DAILY_LIMIT.toString(),
						'X-RateLimit-Remaining': '0',
						'X-RateLimit-Reset': rateLimit.resetTime.toString()
					}
				}
			);
		}

		const { idea } = await request.json();

		if (!idea || typeof idea !== 'string' || idea.trim().length < 10) {
			return json({ error: 'Please provide a more detailed idea description' }, { status: 400 });
		}

		const message = await client.messages.create({
			model: 'claude-3-5-haiku-20241022',
			max_tokens: 1024,
			messages: [
				{
					role: 'user',
					content: USER_PROMPT(idea.trim())
				}
			],
			system: SYSTEM_PROMPT
		});

		const responseText = message.content[0].type === 'text' ? message.content[0].text : '';

		// Parse the JSON response
		const jsonMatch = responseText.match(/\{[\s\S]*\}/);
		if (!jsonMatch) {
			throw new Error('Failed to parse AI response');
		}

		const analysisResult = JSON.parse(jsonMatch[0]);

		// Generate a unique ID for this scorecard
		const id = crypto.randomUUID().slice(0, 8);

		const scoreCard: ScoreCard = {
			id,
			idea: idea.trim(),
			overallScore: analysisResult.overallScore,
			verdict: analysisResult.verdict,
			dimensions: analysisResult.dimensions,
			ycVerdict: analysisResult.ycVerdict,
			ycReason: analysisResult.ycReason,
			killerInsight: analysisResult.killerInsight,
			weakestArea: analysisResult.weakestArea,
			createdAt: new Date().toISOString()
		};

		return json(scoreCard, {
			headers: {
				'X-RateLimit-Limit': DAILY_LIMIT.toString(),
				'X-RateLimit-Remaining': rateLimit.remaining.toString(),
				'X-RateLimit-Reset': rateLimit.resetTime.toString()
			}
		});
	} catch (error) {
		console.error('Analysis error:', error);
		return json(
			{ error: 'Failed to analyze idea. Please try again.' },
			{ status: 500 }
		);
	}
};
