<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import type { ScoreCard } from '$lib/types';

	interface Props {
		scoreCard: ScoreCard;
	}

	let { scoreCard }: Props = $props();

	interface Recommendation {
		skill: string;
		pitch: string;
		icon: string;
	}

	const weaknessMap: Record<string, Recommendation> = {
		problemClarity: {
			skill: 'Problem Discovery',
			pitch: 'Talk to 10 customers in 10 minutes',
			icon: '🎯'
		},
		marketSize: {
			skill: 'Market Researcher',
			pitch: 'Get TAM numbers you can cite',
			icon: '📊'
		},
		competition: {
			skill: 'Competitor Intel',
			pitch: 'Know what you\'re walking into',
			icon: '🔍'
		},
		execution: {
			skill: 'MVP Architect',
			pitch: 'Scope something you can ship this month',
			icon: '🛠️'
		}
	};

	const alwaysAvailable: Recommendation[] = [
		{
			skill: 'Landing Page Builder',
			pitch: 'Start collecting emails tonight',
			icon: '🚀'
		},
		{
			skill: 'Idea Refiner',
			pitch: 'Run this through 10 variations',
			icon: '✨'
		}
	];

	const getWeakestRecommendation = (): Recommendation => {
		return weaknessMap[scoreCard.weakestArea] || weaknessMap.problemClarity;
	};

	const ycRecommendation: Recommendation = {
		skill: 'Pitch Coach',
		pitch: 'Nail the one-liner',
		icon: '🎤'
	};
</script>

<div class="mt-8" in:fade={{ duration: 300, delay: 1000 }}>
	<div class="terminal-box p-6">
		<h3 class="text-lg font-semibold text-vibe-text mb-2">
			Want to improve this score?
		</h3>
		<p class="text-vibe-muted text-sm mb-6">
			Based on your weak points, these would help:
		</p>

		<div class="space-y-3">
			<!-- Primary recommendation based on weakness -->
			<a
				href="https://spawner.ai"
				target="_blank"
				rel="noopener noreferrer"
				class="block p-4 bg-vibe-mint/10 border border-vibe-mint/30 hover:bg-vibe-mint/20 hover:border-vibe-mint/50 transition-all group"
			>
				<div class="flex items-center gap-3">
					<span class="text-2xl">{getWeakestRecommendation().icon}</span>
					<div class="flex-1">
						<div class="font-semibold text-vibe-text group-hover:text-vibe-mint transition-colors">
							{getWeakestRecommendation().skill}
						</div>
						<div class="text-vibe-muted text-sm">
							{getWeakestRecommendation().pitch}
						</div>
					</div>
					<span class="text-vibe-muted group-hover:text-vibe-mint transition-colors">→</span>
				</div>
			</a>

			<!-- YC-specific recommendation if verdict is MAYBE or PASS -->
			{#if scoreCard.ycVerdict !== 'YES'}
				<a
					href="https://spawner.ai"
					target="_blank"
					rel="noopener noreferrer"
					class="block p-4 bg-vibe-bg border border-vibe-border hover:bg-vibe-surface hover:border-vibe-mint/30 transition-all group"
				>
					<div class="flex items-center gap-3">
						<span class="text-2xl">{ycRecommendation.icon}</span>
						<div class="flex-1">
							<div class="font-semibold text-vibe-text group-hover:text-vibe-mint transition-colors">
								{ycRecommendation.skill}
							</div>
							<div class="text-vibe-muted text-sm">
								{ycRecommendation.pitch}
							</div>
						</div>
						<span class="text-vibe-muted group-hover:text-vibe-mint transition-colors">→</span>
					</div>
				</a>
			{/if}
		</div>

		<!-- Always available -->
		<div class="mt-6 pt-4 border-t border-vibe-border">
			<p class="text-vibe-muted text-xs mb-3">Always available:</p>
			<div class="flex flex-wrap gap-2">
				{#each alwaysAvailable as rec}
					<a
						href="https://spawner.ai"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 px-3 py-1.5 bg-vibe-surface border border-vibe-border hover:border-vibe-mint/50 text-sm text-vibe-muted hover:text-vibe-text transition-all"
					>
						<span>{rec.icon}</span>
						<span>{rec.skill}</span>
					</a>
				{/each}
			</div>
		</div>

		<div class="mt-6 text-center">
			<a
				href="https://spawner.ai"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 text-vibe-mint hover:text-vibe-mint-light transition-colors text-sm font-medium"
			>
				Explore on Spawner
				<span>→</span>
			</a>
		</div>
	</div>
</div>
