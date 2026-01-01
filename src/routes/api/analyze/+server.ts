import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { ANTHROPIC_API_KEY } from '$env/static/private';
import Anthropic from '@anthropic-ai/sdk';
import type { ScoreCard } from '$lib/types';

const client = new Anthropic({
	apiKey: ANTHROPIC_API_KEY
});

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
		const { idea } = await request.json();

		if (!idea || typeof idea !== 'string' || idea.trim().length < 10) {
			return json({ error: 'Please provide a more detailed idea description' }, { status: 400 });
		}

		const message = await client.messages.create({
			model: 'claude-sonnet-4-20250514',
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

		return json(scoreCard);
	} catch (error) {
		console.error('Analysis error:', error);
		return json(
			{ error: 'Failed to analyze idea. Please try again.' },
			{ status: 500 }
		);
	}
};
