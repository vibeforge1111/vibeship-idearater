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

	const getYCIcon = (verdict: string): string => {
		switch (verdict) {
			case 'YES': return '✓';
			case 'MAYBE': return '~';
			case 'PASS': return '✗';
			default: return '~';
		}
	};

	const getYCColor = (verdict: string): string => {
		switch (verdict) {
			case 'YES': return 'text-vibe-mint';
			case 'MAYBE': return 'text-vibe-muted';
			case 'PASS': return 'text-vibe-muted';
			default: return 'text-vibe-muted';
		}
	};

	onMount(() => {
		setTimeout(() => showScore = true, 300);
		setTimeout(() => showDetails = true, 800);
	});
</script>

<div class="terminal-box w-full" id="scorecard">
	<!-- Terminal header bar -->
	<div class="flex items-center gap-2 px-6 py-4 border-b border-vibe-border bg-vibe-bg">
		<div class="w-3 h-3 rounded-full bg-vibe-red"></div>
		<div class="w-3 h-3 rounded-full bg-vibe-yellow"></div>
		<div class="w-3 h-3 rounded-full bg-vibe-green"></div>
		<span class="ml-3 text-vibe-muted text-sm">vibeship idearater</span>
	</div>

	<!-- Main content with generous padding -->
	<div class="p-8">
		<!-- Command prompt -->
		<div class="flex items-center gap-3 mb-6">
			<span class="text-vibe-mint text-lg">$</span>
			<span class="text-vibe-muted">idearater --analyze</span>
		</div>

		<!-- Big Score - prominent and readable -->
		{#if showScore}
			<div class="mb-8" in:scale={{ duration: 400, start: 0.8 }}>
				<div class="flex items-baseline gap-4">
					<span class="text-7xl sm:text-8xl font-bold text-vibe-mint">{scoreCard.overallScore}</span>
					<span class="text-vibe-muted text-2xl">/100</span>
				</div>
				<p class="text-vibe-muted text-lg mt-2">{scoreCard.verdict}</p>
			</div>
		{/if}

		{#if showDetails}
			<!-- The Idea -->
			{#if !stealthMode}
				<div class="mb-8 p-5 bg-vibe-bg border border-vibe-border" in:fade={{ duration: 300 }}>
					<p class="text-vibe-muted text-sm mb-2">The Idea</p>
					<p class="text-vibe-text text-base leading-relaxed">{scoreCard.idea}</p>
				</div>
			{:else}
				<div class="mb-8 p-5 bg-vibe-bg border border-vibe-border" in:fade={{ duration: 300 }}>
					<p class="text-vibe-mint text-base">Ask me about my {scoreCard.overallScore}/100 idea</p>
				</div>
			{/if}

			<!-- Score Dimensions - full width bars with good spacing -->
			<div class="mb-8 space-y-5" in:fade={{ duration: 300, delay: 100 }}>
				<p class="text-vibe-muted text-sm mb-4">Breakdown</p>
				<ScoreBar label="Problem Clarity" score={scoreCard.dimensions.problemClarity} delay={0} />
				<ScoreBar label="Market Size" score={scoreCard.dimensions.marketSize} delay={100} />
				<ScoreBar label="Competition" score={scoreCard.dimensions.competition} delay={200} />
				<ScoreBar label="Execution" score={scoreCard.dimensions.execution} delay={300} />
			</div>

			<!-- YC Verdict - clear and readable -->
			<div class="mb-8 p-5 bg-vibe-bg border border-vibe-border" in:fade={{ duration: 300, delay: 400 }}>
				<div class="flex items-center gap-3 mb-2">
					<span class="text-vibe-muted text-sm">YC Verdict:</span>
					<span class="{getYCColor(scoreCard.ycVerdict)} font-mono">[{getYCIcon(scoreCard.ycVerdict)}]</span>
					<span class="text-vibe-text font-bold">{scoreCard.ycVerdict}</span>
				</div>
				<p class="text-vibe-muted text-base">{scoreCard.ycReason}</p>
			</div>

			<!-- Killer Insight - highlighted and prominent -->
			<div class="p-5 bg-vibe-mint/10 border-l-4 border-vibe-mint" in:fade={{ duration: 300, delay: 600 }}>
				<p class="text-vibe-muted text-sm mb-2">Key Insight</p>
				<p class="text-vibe-text text-lg leading-relaxed">"{scoreCard.killerInsight}"</p>
			</div>

			<!-- Footer -->
			<div class="flex items-center gap-3 mt-8 pt-6 border-t border-vibe-border">
				<span class="text-vibe-mint">$</span>
				<span class="text-vibe-muted text-sm">vibeship.co/idearater</span>
				<span class="text-vibe-mint animate-pulse">▋</span>
			</div>
		{/if}
	</div>
</div>
