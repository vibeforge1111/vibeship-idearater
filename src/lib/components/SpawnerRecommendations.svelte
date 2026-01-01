<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { ScoreCard } from '$lib/types';

	interface Props {
		scoreCard: ScoreCard;
	}

	let { scoreCard }: Props = $props();

	// Messages by score range
	const lowScoreMessages = [
		"Don't give up yet.",
		"Every great startup started somewhere.",
		"Time to pivot smarter.",
		"Let's find a better angle.",
		"Back to the drawing board—but faster.",
		"Your next iteration could be the one.",
		"Great founders iterate. Let's go.",
		"The idea needs work. The builder doesn't.",
	];

	const midScoreMessages = [
		"You're onto something.",
		"Close, but not quite there yet.",
		"A few tweaks could change everything.",
		"The foundation is solid. Now refine it.",
		"You're in striking distance.",
		"One insight away from breakthrough.",
		"Good bones. Let's add muscle.",
		"The market is waiting. Polish this.",
	];

	const highScoreMessages = [
		"Now build it.",
		"Stop planning. Start shipping.",
		"The idea is ready. Are you?",
		"Green light. Go.",
		"Time to execute.",
		"You've got something. Move fast.",
		"The hard part is done. Now build.",
		"Ship it before someone else does.",
	];

	// Messages by weakness area
	const weaknessMessages: Record<string, string[]> = {
		problem: [
			"Find your real customer first.",
			"Talk to 50 users this week.",
			"The problem isn't clear enough yet.",
			"Who actually has this pain?",
		],
		market: [
			"Is this market big enough?",
			"Find the $1B+ opportunity.",
			"Zoom out. Think bigger.",
			"The TAM needs work.",
		],
		solution: [
			"Your solution needs sharper focus.",
			"Is this 10x better than alternatives?",
			"Simplify the solution.",
			"What's the core value prop?",
		],
		timing: [
			"Why now? Figure that out.",
			"The market might not be ready.",
			"Timing is everything. Nail it.",
			"What changed that makes this possible?",
		],
		uniqueness: [
			"What makes you different?",
			"Find your unfair advantage.",
			"Why you? Why this approach?",
			"The insight is missing.",
		],
		businessModel: [
			"How will this make money?",
			"The revenue model needs work.",
			"Who pays? How much? Why?",
			"Monetization isn't clear yet.",
		],
		scalability: [
			"Can this grow without you?",
			"Build for scale from day one.",
			"Where are the network effects?",
			"Think leverage. Think systems.",
		],
		moat: [
			"What stops copycats?",
			"Build defensibility early.",
			"Where's the compounding advantage?",
			"Moats take time. Start now.",
		],
	};

	// YC verdict specific messages
	const ycMessages = {
		YES: [
			"YC material. Make it happen.",
			"This could go far. Build fast.",
			"Apply to YC. Seriously.",
		],
		MAYBE: [
			"One unlock away from YC.",
			"Interesting thesis. Needs proof.",
			"The potential is there. Show it.",
		],
		PASS: [
			"Not every great business is VC-scale.",
			"Bootstrap this. Own 100%.",
			"Build profitably. Skip the VC game.",
		],
	};

	const getRecommendation = (): { headline: string; subtext: string } => {
		const score = scoreCard.pmfScore;
		const weakness = scoreCard.weakestArea;
		const ycVerdict = scoreCard.ycVerdict;

		// Pick random from appropriate arrays
		const pickRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

		let headline: string;
		let subtext: string;

		// Score-based headline
		if (score < 40) {
			headline = pickRandom(lowScoreMessages);
		} else if (score < 70) {
			headline = pickRandom(midScoreMessages);
		} else {
			headline = pickRandom(highScoreMessages);
		}

		// Weakness or YC-based subtext (mix it up)
		const useYcMessage = Math.random() > 0.6;
		if (useYcMessage && ycMessages[ycVerdict]) {
			subtext = pickRandom(ycMessages[ycVerdict]);
		} else if (weaknessMessages[weakness]) {
			subtext = pickRandom(weaknessMessages[weakness]);
		} else {
			subtext = "450+ skills for Claude";
		}

		return { headline, subtext };
	};

	const recommendation = getRecommendation();
</script>

<!-- Personalized Spawner CTA -->
<div class="mt-6" in:fade={{ duration: 300, delay: 800 }}>
	<a
		href="https://spawner.vibeship.co"
		target="_blank"
		rel="noopener noreferrer"
		class="flex items-center justify-between p-4 bg-vibe-surface border border-vibe-border hover:border-vibe-mint/50 hover:bg-vibe-mint/5 transition-all group"
	>
		<div class="flex items-center gap-2">
			<span class="text-vibe-text text-sm">{recommendation.headline}</span>
			<span class="text-vibe-muted text-sm">{recommendation.subtext}</span>
		</div>
		<span class="text-vibe-muted group-hover:text-vibe-mint transition-colors">→</span>
	</a>
</div>
