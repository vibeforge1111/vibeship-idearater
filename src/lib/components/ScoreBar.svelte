<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		label: string;
		score: number;
		delay?: number;
	}

	let { label, score, delay = 0 }: Props = $props();
	let animatedScore = $state(0);
	let visible = $state(false);

	const getScoreColor = (s: number): string => {
		if (s >= 80) return 'var(--vibe-green)';
		if (s >= 60) return 'var(--vibe-cyan)';
		if (s >= 40) return 'var(--vibe-yellow)';
		return 'var(--vibe-red)';
	};

	onMount(() => {
		setTimeout(() => {
			visible = true;
			const duration = 800;
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

<div
	class="transition-all duration-500"
	class:opacity-0={!visible}
	class:translate-y-2={!visible}
	class:opacity-100={visible}
	class:translate-y-0={visible}
>
	<div class="flex justify-between items-center mb-1">
		<span class="text-sm text-vibe-muted">{label}</span>
		<span class="text-sm font-semibold" style="color: {getScoreColor(score)}">{animatedScore}</span>
	</div>
	<div class="h-1 bg-vibe-border overflow-hidden">
		<div
			class="h-full transition-all duration-700 ease-out"
			style="width: {visible ? score : 0}%; background: {getScoreColor(score)};"
		></div>
	</div>
</div>
