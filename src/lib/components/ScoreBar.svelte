<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		label: string;
		score: number;
		delay?: number;
		compact?: boolean;
		tooltip?: string;
	}

	let { label, score, delay = 0, compact = false, tooltip = '' }: Props = $props();
	let animatedScore = $state(0);
	let visible = $state(false);
	let showTooltip = $state(false);

	const getScoreColor = (s: number): string => {
		if (s >= 80) return 'var(--vibe-green)';
		if (s >= 60) return 'var(--vibe-mint)';
		if (s >= 40) return 'var(--vibe-yellow)';
		return 'var(--vibe-red)';
	};

	onMount(() => {
		setTimeout(() => {
			visible = true;
			const duration = 600;
			const startTime = Date.now();

			const animate = () => {
				const elapsed = Date.now() - startTime;
				const progress = Math.min(elapsed / duration, 1);
				const eased = 1 - Math.pow(1 - progress, 3);
				animatedScore = Math.round(score * eased);

				if (progress < 1) {
					requestAnimationFrame(animate);
				}
			};

			requestAnimationFrame(animate);
		}, delay);
	});
</script>

{#if compact}
	<!-- Compact mode for social card -->
	<div
		class="flex items-center gap-2 transition-all duration-300"
		class:opacity-0={!visible}
		class:opacity-100={visible}
	>
		<span class="text-xs text-vibe-muted w-20">{label}</span>
		<div class="flex-1 h-1 bg-vibe-border/50 overflow-hidden">
			<div
				class="h-full transition-all duration-500 ease-out"
				style="width: {visible ? score : 0}%; background: {getScoreColor(score)};"
			></div>
		</div>
		<span class="text-xs font-mono w-6 text-right" style="color: {getScoreColor(score)}">{animatedScore}</span>
	</div>
{:else}
	<!-- Full mode -->
	<div
		class="transition-all duration-500 relative"
		class:opacity-0={!visible}
		class:translate-y-2={!visible}
		class:opacity-100={visible}
		class:translate-y-0={visible}
	>
		<div class="flex justify-between items-center mb-1.5">
			<span
				class="text-sm text-vibe-muted cursor-help relative"
				onmouseenter={() => showTooltip = true}
				onmouseleave={() => showTooltip = false}
			>
				{label}
				{#if showTooltip && tooltip}
					<div class="absolute bottom-full left-0 mb-2 px-3 py-2 bg-vibe-surface border border-vibe-border text-xs text-vibe-text whitespace-normal w-72 z-50 shadow-lg">
						{tooltip}
						<div class="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-vibe-border"></div>
					</div>
				{/if}
			</span>
			<span class="text-sm font-bold" style="color: {getScoreColor(score)}">{animatedScore}</span>
		</div>
		<div class="h-2 bg-vibe-border overflow-hidden">
			<div
				class="h-full transition-all duration-700 ease-out"
				style="width: {visible ? score : 0}%; background: {getScoreColor(score)};"
			></div>
		</div>
	</div>
{/if}
