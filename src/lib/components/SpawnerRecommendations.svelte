<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { ScoreCard } from '$lib/types';

	interface Props {
		scoreCard: ScoreCard;
	}

	let { scoreCard }: Props = $props();

	const weaknessLabels: Record<string, string> = {
		problem: 'Problem Discovery',
		market: 'Market Research',
		solution: 'Solution Validation',
		timing: 'Market Timing Analysis',
		uniqueness: 'Differentiation Strategy',
		businessModel: 'Revenue Model Design',
		scalability: 'Growth Strategy',
		moat: 'Defensibility Planning'
	};

	const getWeakness = (): string => {
		return weaknessLabels[scoreCard.weakestArea] || 'Problem Discovery';
	};
</script>

<!-- Compact improvement suggestion -->
<div class="mt-6" in:fade={{ duration: 300, delay: 800 }}>
	<a
		href="https://spawner.ai"
		target="_blank"
		rel="noopener noreferrer"
		class="flex items-center justify-between p-4 bg-vibe-surface border border-vibe-border hover:border-vibe-mint/50 hover:bg-vibe-mint/5 transition-all group"
	>
		<div class="flex items-center gap-3">
			<span class="text-vibe-muted text-sm">Improve your score?</span>
			<span class="text-vibe-text text-sm">Try <span class="text-vibe-mint">{getWeakness()}</span> on Spawner</span>
		</div>
		<span class="text-vibe-muted group-hover:text-vibe-mint transition-colors">→</span>
	</a>
</div>
