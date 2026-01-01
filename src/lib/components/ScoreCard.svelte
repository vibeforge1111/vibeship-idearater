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

	<!-- Main content with two-column layout -->
	<div class="p-6 sm:p-8">
		<!-- Command prompt -->
		<div class="flex items-center gap-3 mb-6">
			<span class="text-vibe-mint text-lg">$</span>
			<span class="text-vibe-muted">idearater --analyze</span>
		</div>

		<!-- Two column layout: Left content, Right breakdown -->
		<div class="flex flex-col lg:flex-row gap-8">
			<!-- Left column: Score, Idea, YC, Insight -->
			<div class="flex-1 min-w-0">
				<!-- Big Score - prominent and readable -->
				{#if showScore}
					<div class="mb-6" in:scale={{ duration: 400, start: 0.8 }}>
						<div class="flex items-baseline gap-4">
							<span class="text-6xl sm:text-7xl font-bold text-vibe-mint">{scoreCard.overallScore}</span>
							<span class="text-vibe-muted text-xl">/100</span>
						</div>
						<p class="text-vibe-muted text-base mt-2">{scoreCard.verdict}</p>
					</div>
				{/if}

				{#if showDetails}
					<!-- The Idea -->
					{#if !stealthMode}
						<div class="mb-6 p-4 bg-vibe-bg border border-vibe-border" in:fade={{ duration: 300 }}>
							<p class="text-vibe-muted text-xs mb-2">The Idea</p>
							<p class="text-vibe-text text-sm leading-relaxed">{scoreCard.idea}</p>
						</div>
					{:else}
						<div class="mb-6 p-4 bg-vibe-bg border border-vibe-border" in:fade={{ duration: 300 }}>
							<p class="text-vibe-mint text-sm">Ask me about my {scoreCard.overallScore}/100 idea</p>
						</div>
					{/if}

					<!-- YC Verdict -->
					<div class="mb-6 p-4 bg-vibe-bg border border-vibe-border" in:fade={{ duration: 300, delay: 400 }}>
						<div class="flex items-center gap-3 mb-2">
							<span class="text-vibe-muted text-xs">YC Verdict:</span>
							<span class="{getYCColor(scoreCard.ycVerdict)} font-mono text-sm">[{getYCIcon(scoreCard.ycVerdict)}]</span>
							<span class="text-vibe-text font-bold text-sm">{scoreCard.ycVerdict}</span>
						</div>
						<p class="text-vibe-muted text-sm">{scoreCard.ycReason}</p>
					</div>

					<!-- Killer Insight -->
					<div class="p-4 bg-vibe-mint/10 border-l-4 border-vibe-mint" in:fade={{ duration: 300, delay: 600 }}>
						<p class="text-vibe-muted text-xs mb-2">Key Insight</p>
						<p class="text-vibe-text text-sm leading-relaxed">"{scoreCard.killerInsight}"</p>
					</div>
				{/if}
			</div>

			<!-- Right column: Breakdown -->
			{#if showDetails}
				<div class="lg:w-64 flex-shrink-0" in:fade={{ duration: 300, delay: 100 }}>
					<div class="p-4 bg-vibe-bg border border-vibe-border h-full">
						<p class="text-vibe-muted text-xs mb-4">Breakdown</p>
						<div class="space-y-4">
							<ScoreBar label="Problem Clarity" score={scoreCard.dimensions.problemClarity} delay={0} />
							<ScoreBar label="Market Size" score={scoreCard.dimensions.marketSize} delay={100} />
							<ScoreBar label="Competition" score={scoreCard.dimensions.competition} delay={200} />
							<ScoreBar label="Execution" score={scoreCard.dimensions.execution} delay={300} />
						</div>
					</div>
				</div>
			{/if}
		</div>

		<!-- Footer -->
		{#if showDetails}
			<div class="flex items-center gap-3 mt-6 pt-4 border-t border-vibe-border">
				<span class="text-vibe-mint">$</span>
				<span class="text-vibe-muted text-sm">vibeship.co/idearater</span>
				<span class="text-vibe-mint animate-pulse">▋</span>
			</div>
		{/if}
	</div>
</div>
