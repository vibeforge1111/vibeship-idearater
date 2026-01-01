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
	let typedText = $state('');
	let isTyping = $state(true);
	const fullText = 'vibeship.co/idearater';

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

		// Start typing animation after details show
		setTimeout(() => {
			let i = 0;
			const typeInterval = setInterval(() => {
				if (i < fullText.length) {
					typedText = fullText.slice(0, i + 1);
					i++;
				} else {
					clearInterval(typeInterval);
					isTyping = false;
				}
			}, 80);
		}, 1200);
	});
</script>

<div class="terminal-box w-full" id="scorecard">
	<!-- Terminal header bar -->
	<div class="flex items-center gap-2 px-6 py-4 border-b border-vibe-border bg-vibe-bg">
		<div class="w-3 h-3 rounded-full bg-vibe-red"></div>
		<div class="w-3 h-3 rounded-full bg-vibe-yellow"></div>
		<div class="w-3 h-3 rounded-full bg-vibe-green"></div>
		<span class="ml-3 text-vibe-muted text-sm">vibeship</span>
	</div>

	<!-- Main content - horizontal layout -->
	<div class="p-5">
		<!-- Top row: Score + Verdict + Insight -->
		<div class="flex flex-col lg:flex-row gap-5 mb-5">
			<!-- PMF Score -->
			{#if showScore}
				<div class="flex-shrink-0" in:scale={{ duration: 400, start: 0.8 }}>
					<div class="flex items-baseline gap-2">
						<span class="text-5xl font-bold text-vibe-mint">{scoreCard.pmfScore}</span>
						<span class="text-vibe-muted text-lg">/100</span>
					</div>
					<p class="text-vibe-muted text-xs">PMF Potential</p>
				</div>
			{/if}

			{#if showDetails}
				<!-- The Pitch -->
				{#if !stealthMode}
					<div class="flex-1 p-3 bg-vibe-bg border border-vibe-border min-w-0" in:fade={{ duration: 300 }}>
						<p class="text-vibe-muted text-xs mb-1">The Pitch</p>
						<p class="text-vibe-text text-sm leading-snug">{scoreCard.pitch}</p>
					</div>
				{:else}
					<div class="flex-1 p-3 bg-vibe-bg border border-vibe-border" in:fade={{ duration: 300 }}>
						<p class="text-vibe-muted text-xs mb-1">[STEALTH MODE]</p>
						<p class="text-vibe-mint text-sm">Idea hidden. Score revealed.</p>
					</div>
				{/if}

				<!-- YC Verdict -->
				<div class="flex-shrink-0 p-3 bg-vibe-yc/5 border border-vibe-yc/30" in:fade={{ duration: 300, delay: 200 }}>
					<div class="flex items-center gap-2 mb-1">
						<span class="text-vibe-yc font-bold text-sm">YC</span>
						<span class="{getYCColor(scoreCard.ycVerdict)} font-mono text-sm">[{getYCIcon(scoreCard.ycVerdict)}]</span>
						<span class="text-vibe-text font-bold text-sm">{scoreCard.ycVerdict}</span>
					</div>
					<p class="text-vibe-muted text-xs max-w-48">{scoreCard.ycReason}</p>
				</div>
			{/if}
		</div>

		{#if showDetails}
			<!-- Breakdown - 2 columns of 4 bars each for width -->
			<div class="p-5 bg-vibe-bg border border-vibe-border mb-4" in:fade={{ duration: 300, delay: 100 }}>
				<p class="text-vibe-muted text-xs mb-4">Breakdown</p>
				<div class="grid grid-cols-2 gap-x-10 gap-y-4">
					<ScoreBar label="Problem" score={scoreCard.dimensions.problem} delay={0} />
					<ScoreBar label="Uniqueness" score={scoreCard.dimensions.uniqueness} delay={50} />
					<ScoreBar label="Market" score={scoreCard.dimensions.market} delay={100} />
					<ScoreBar label="Business Model" score={scoreCard.dimensions.businessModel} delay={150} />
					<ScoreBar label="Solution" score={scoreCard.dimensions.solution} delay={200} />
					<ScoreBar label="Scalability" score={scoreCard.dimensions.scalability} delay={250} />
					<ScoreBar label="Timing" score={scoreCard.dimensions.timing} delay={300} />
					<ScoreBar label="Defensibility" score={scoreCard.dimensions.defensibility} delay={350} />
				</div>
			</div>

			<!-- Key Insight -->
			<div class="p-3 bg-vibe-mint/10 border-l-4 border-vibe-mint mb-4" in:fade={{ duration: 300, delay: 400 }}>
				<p class="text-vibe-muted text-xs mb-1">Key Insight</p>
				<p class="text-vibe-text text-sm">"{scoreCard.killerInsight}"</p>
			</div>

			<!-- Footer with typing animation -->
			<div class="flex items-center gap-3 pt-4 mt-2 border-t border-vibe-border">
				<span class="text-vibe-mint text-base">$</span>
				<span class="text-vibe-text text-base font-mono tracking-wide">{typedText}</span><span class="text-vibe-mint text-base animate-blink">▋</span>
			</div>
		{/if}
	</div>
</div>
