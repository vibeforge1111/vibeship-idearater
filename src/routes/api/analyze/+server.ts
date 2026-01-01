import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { ANTHROPIC_API_KEY } from '$env/static/private';
import Anthropic from '@anthropic-ai/sdk';
import type { ScoreCard } from '$lib/types';

const client = new Anthropic({
	apiKey: ANTHROPIC_API_KEY
});

// Rate limiting: 10 requests per day per IP
const DAILY_LIMIT = 10;
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

const SYSTEM_PROMPT = `You are a YC partner who has reviewed thousands of applications. You evaluate ideas the way YC does - looking for billion-dollar potential, not just good businesses.

Evaluate startup ideas on 8 dimensions (0-100 each, where 100 is best):

1. Problem (0-100): How real and painful is this problem? Are people actively looking for solutions? Would they pay to solve it today?
2. Market (0-100): How big is the opportunity? $10M niche or $10B+ market? Is it growing?
3. Solution (0-100): Does this solution actually fit the problem? Is it 10x better than alternatives?
4. Timing (0-100): Why now? Is the market ready? Too early? Too late? What changed recently?
5. Uniqueness (0-100): What's the insight others are missing? Why hasn't this been done before?
6. Business Model (0-100): Is there a clear, believable path to making money at scale?
7. Scalability (0-100): Can this grow without proportional effort/cost? Network effects? Viral loops?
8. Moat (0-100): Can they build defensibility? Data, network effects, switching costs, or brand?

The PMF Score is the overall likelihood this idea could achieve product-market fit. It's the average of all dimensions.

YC Verdict:
- YES: This could be a billion-dollar company. Apply to YC.
- MAYBE: Interesting thesis but needs one big unlock to work.
- PASS: Not a VC-scale business. Could still be a great company.

Provide ONE killer insight - the most important thing about this idea. Be specific and memorable:
- "Your real competitor isn't [X], it's Excel spreadsheets."
- "This is a feature, not a company. Who's the platform?"
- "The timing is perfect. Three trends converging in your favor."

Your tone: Direct, specific, constructive, confident. Even a 34/100 should feel fair and insightful.`;

const USER_PROMPT = (idea: string) => `Evaluate this startup idea:

"${idea}"

Respond in this exact JSON format:
{
  "pitch": "<8-12 word pitch version of this idea, like a tagline>",
  "pmfScore": <number 0-100, should be close to the average of all dimensions>,
  "verdict": "<one short sentence summarizing the idea's potential>",
  "dimensions": {
    "problem": <number 0-100>,
    "market": <number 0-100>,
    "solution": <number 0-100>,
    "timing": <number 0-100>,
    "uniqueness": <number 0-100>,
    "businessModel": <number 0-100>,
    "scalability": <number 0-100>,
    "moat": <number 0-100>
  },
  "ycVerdict": "<YES|MAYBE|PASS>",
  "ycReason": "<one sentence explaining the YC verdict>",
  "killerInsight": "<one memorable, specific insight about this idea>",
  "weakestArea": "<problem|market|solution|timing|uniqueness|businessModel|scalability|moat>"
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
			pitch: analysisResult.pitch,
			pmfScore: analysisResult.pmfScore,
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
