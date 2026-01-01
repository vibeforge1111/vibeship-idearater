<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		label: string;
		score: number;
		delay?: number;
		compact?: boolean;
	}

	let { label, score, delay = 0, compact = false }: Props = $props();
	let animatedScore = $state(0);
	let visible = $state(false);

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
		class="transition-all duration-500"
		class:opacity-0={!visible}
		class:translate-y-2={!visible}
		class:opacity-100={visible}
		class:translate-y-0={visible}
	>
		<div class="flex justify-between items-center mb-1.5">
			<span class="text-sm text-vibe-muted">{label}</span>
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
