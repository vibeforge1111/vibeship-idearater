<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly, scale } from 'svelte/transition';
	import ScoreBar from './ScoreBar.svelte';
	import type { ScoreCard } from '$lib/types';

	interface Props {
		scoreCard: ScoreCard;
		stealthMode?: boolean;
	}

	let { scoreCard, stealthMode = false }: Props = $props();
	let showScore = $state(false);
	let showDetails = $state(false);
	let cardElement: HTMLDivElement | undefined = $state();

	const getYCEmoji = (verdict: string): string => {
		switch (verdict) {
			case 'YES': return '🟢';
			case 'MAYBE': return '🤔';
			case 'PASS': return '🔴';
			default: return '🤔';
		}
	};

	const getYCColor = (verdict: string): string => {
		switch (verdict) {
			case 'YES': return 'var(--vibe-green)';
			case 'MAYBE': return 'var(--vibe-yellow)';
			case 'PASS': return 'var(--vibe-red)';
			default: return 'var(--vibe-muted)';
		}
	};

	onMount(() => {
		setTimeout(() => showScore = true, 300);
		setTimeout(() => showDetails = true, 800);
	});
</script>

<div
	bind:this={cardElement}
	class="terminal-box p-6 sm:p-8 w-full max-w-lg mx-auto"
	id="scorecard"
>
	<!-- Terminal header -->
	<div class="flex items-center gap-2 mb-6 pb-4 border-b border-vibe-border">
		<div class="w-3 h-3 rounded-full bg-vibe-red"></div>
		<div class="w-3 h-3 rounded-full bg-vibe-yellow"></div>
		<div class="w-3 h-3 rounded-full bg-vibe-green"></div>
		<span class="ml-4 text-vibe-muted text-sm">vibeship_idearater</span>
	</div>

	<!-- Big Score -->
	{#if showScore}
		<div class="text-center mb-6" in:scale={{ duration: 600, start: 0.5 }}>
			<div class="text-6xl sm:text-7xl font-bold gradient-text mb-2">
				{scoreCard.overallScore}<span class="text-3xl text-vibe-muted">/100</span>
			</div>
			<p class="text-vibe-muted text-sm italic">"{scoreCard.verdict}"</p>
		</div>
	{/if}

	<!-- Idea (blurred in stealth mode) -->
	{#if showDetails}
		<div
			class="mb-6 p-4 bg-vibe-bg border border-vibe-border"
			in:fade={{ duration: 300 }}
		>
			{#if stealthMode}
				<p class="text-vibe-muted text-sm mb-1">The Idea:</p>
				<p class="text-vibe-text blur-sm select-none">{scoreCard.idea}</p>
				<p class="text-center text-vibe-mint text-xs mt-2">Ask me about my {scoreCard.overallScore}/100 idea 👀</p>
			{:else}
				<p class="text-vibe-muted text-sm mb-1">The Idea:</p>
				<p class="text-vibe-text text-sm">{scoreCard.idea}</p>
			{/if}
		</div>
	{/if}

	<!-- Score Bars -->
	{#if showDetails}
		<div class="space-y-4 mb-6" in:fade={{ duration: 300, delay: 100 }}>
			<ScoreBar label="Problem Clarity" score={scoreCard.dimensions.problemClarity} delay={0} />
			<ScoreBar label="Market Size" score={scoreCard.dimensions.marketSize} delay={100} />
			<ScoreBar label="Competition" score={scoreCard.dimensions.competition} delay={200} />
			<ScoreBar label="Execution" score={scoreCard.dimensions.execution} delay={300} />
		</div>
	{/if}

	<!-- YC Verdict -->
	{#if showDetails}
		<div
			class="text-center mb-6 p-4 border"
			style="border-color: {getYCColor(scoreCard.ycVerdict)}; background: {getYCColor(scoreCard.ycVerdict)}15;"
			in:fade={{ duration: 300, delay: 500 }}
		>
			<div class="text-lg font-bold" style="color: {getYCColor(scoreCard.ycVerdict)}">
				YC: {scoreCard.ycVerdict} {getYCEmoji(scoreCard.ycVerdict)}
			</div>
			<p class="text-vibe-muted text-xs mt-1">{scoreCard.ycReason}</p>
		</div>
	{/if}

	<!-- Killer Insight -->
	{#if showDetails}
		<div
			class="p-4 bg-vibe-mint/10 border border-vibe-mint/30"
			in:fade={{ duration: 300, delay: 700 }}
		>
			<div class="flex items-start gap-2">
				<span class="text-lg">💡</span>
				<p class="text-vibe-text text-sm italic">"{scoreCard.killerInsight}"</p>
			</div>
		</div>
	{/if}

	<!-- Watermark -->
	<div class="mt-6 pt-4 border-t border-vibe-border text-center">
		<span class="text-vibe-muted text-xs">vibeship.ai/idearater</span>
	</div>
</div>
