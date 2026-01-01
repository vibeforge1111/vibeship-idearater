<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import ScoreBar from './ScoreBar.svelte';
	import type { ScoreCard } from '$lib/types';

	interface Props {
		scoreCard: ScoreCard;
		stealthMode?: boolean;
	}

	let { scoreCard, stealthMode = false }: Props = $props();
	let showScore = $state(false);
	let showDetails = $state(false);

	const getYCColor = (verdict: string): string => {
		switch (verdict) {
			case 'YES': return 'text-vibe-green';
			case 'MAYBE': return 'text-vibe-yellow';
			case 'PASS': return 'text-vibe-red';
			default: return 'text-vibe-muted';
		}
	};

	onMount(() => {
		setTimeout(() => showScore = true, 300);
		setTimeout(() => showDetails = true, 800);
	});
</script>

<!-- Optimized for 1200x630 social sharing aspect ratio (1.91:1) -->
<div
	class="terminal-box w-full max-w-2xl mx-auto"
	id="scorecard"
	style="aspect-ratio: 1.91 / 1;"
>
	<!-- Terminal header bar -->
	<div class="flex items-center gap-2 px-4 py-3 border-b border-vibe-border bg-vibe-bg">
		<div class="w-3 h-3 bg-vibe-red"></div>
		<div class="w-3 h-3 bg-vibe-yellow"></div>
		<div class="w-3 h-3 bg-vibe-green"></div>
		<span class="ml-3 text-vibe-muted text-xs">vibeship idearater — bash</span>
	</div>

	<!-- Terminal content -->
	<div class="p-5 space-y-3 text-sm">
		<!-- Command input -->
		<div class="flex items-center gap-2">
			<span class="text-vibe-mint">$</span>
			<span class="text-vibe-muted">idearater --analyze</span>
		</div>

		<!-- Score output - big and prominent -->
		{#if showScore}
			<div class="flex items-baseline gap-3 pl-4" in:scale={{ duration: 400, start: 0.8 }}>
				<span class="text-5xl font-bold text-vibe-mint">{scoreCard.overallScore}</span>
				<span class="text-vibe-muted text-lg">/100</span>
				<span class="text-vibe-muted text-xs ml-2">— {scoreCard.verdict}</span>
			</div>
		{/if}

		{#if showDetails}
			<!-- Metrics grid - 2x2 for better aspect ratio -->
			<div class="grid grid-cols-2 gap-x-6 gap-y-2 pl-4 mt-2" in:fade={{ duration: 300 }}>
				<ScoreBar label="Problem" score={scoreCard.dimensions.problemClarity} delay={0} compact />
				<ScoreBar label="Market" score={scoreCard.dimensions.marketSize} delay={50} compact />
				<ScoreBar label="Competition" score={scoreCard.dimensions.competition} delay={100} compact />
				<ScoreBar label="Execution" score={scoreCard.dimensions.execution} delay={150} compact />
			</div>

			<!-- YC Verdict line -->
			<div class="flex items-center gap-2 pl-4 mt-2" in:fade={{ duration: 300, delay: 200 }}>
				<span class="text-vibe-muted">YC verdict:</span>
				<span class={getYCColor(scoreCard.ycVerdict)}>{scoreCard.ycVerdict}</span>
				<span class="text-vibe-muted text-xs">— {scoreCard.ycReason}</span>
			</div>

			<!-- Killer insight as terminal output -->
			<div class="mt-2 pl-4 border-l-2 border-vibe-mint/50" in:fade={{ duration: 300, delay: 400 }}>
				{#if stealthMode}
					<p class="text-vibe-muted text-xs blur-sm">{scoreCard.killerInsight}</p>
					<p class="text-vibe-mint text-xs mt-1">Ask me about my {scoreCard.overallScore}/100 idea</p>
				{:else}
					<p class="text-vibe-text text-xs italic">"{scoreCard.killerInsight}"</p>
				{/if}
			</div>

			<!-- Footer with prompt -->
			<div class="flex items-center gap-2 mt-3 pt-2 border-t border-vibe-border/50">
				<span class="text-vibe-mint">$</span>
				<span class="text-vibe-muted text-xs">vibeship.co/idearater</span>
				<span class="text-vibe-mint animate-pulse">▋</span>
			</div>
		{/if}
	</div>
</div>
