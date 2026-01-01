<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	interface Step {
		label: string;
		icon: string;
	}

	const steps: Step[] = [
		{ label: 'Finding your customers...', icon: '🎯' },
		{ label: 'Sizing your market...', icon: '📊' },
		{ label: 'Scanning competitors...', icon: '🔍' },
		{ label: 'Checking YC fit...', icon: '🚀' },
		{ label: 'Generating verdict...', icon: '⚡' }
	];

	let currentStep = $state(0);
	let completedSteps = $state<number[]>([]);

	onMount(() => {
		const interval = setInterval(() => {
			if (currentStep < steps.length - 1) {
				completedSteps = [...completedSteps, currentStep];
				currentStep++;
			}
		}, 1800);

		return () => clearInterval(interval);
	});
</script>

<div class="flex flex-col items-center justify-center py-16">
	<div class="terminal-box p-8 w-full max-w-md">
		<!-- Terminal header -->
		<div class="flex items-center gap-2 mb-6 pb-4 border-b border-vibe-border">
			<div class="w-3 h-3 rounded-full bg-vibe-red"></div>
			<div class="w-3 h-3 rounded-full bg-vibe-yellow"></div>
			<div class="w-3 h-3 rounded-full bg-vibe-green"></div>
			<span class="ml-4 text-vibe-muted text-sm">analyzing_idea.sh</span>
		</div>

		<!-- Progress steps -->
		<div class="space-y-4">
			{#each steps as step, i}
				<div
					class="flex items-center gap-3 transition-all duration-300"
					class:opacity-40={i > currentStep}
					class:opacity-100={i <= currentStep}
				>
					{#if completedSteps.includes(i)}
						<span class="text-vibe-green text-lg" in:fade={{ duration: 200 }}>✓</span>
					{:else if i === currentStep}
						<span class="text-lg animate-pulse">{step.icon}</span>
					{:else}
						<span class="text-vibe-muted text-lg">○</span>
					{/if}

					<span
						class="text-sm font-mono"
						class:text-vibe-text={i <= currentStep}
						class:text-vibe-muted={i > currentStep}
						class:cursor-blink={i === currentStep}
					>
						{#if i <= currentStep}
							{step.label}
						{:else}
							{step.label.replace(/\.\.\./g, '')}
						{/if}
					</span>
				</div>
			{/each}
		</div>

		<!-- Progress bar -->
		<div class="mt-8 h-1 bg-vibe-border overflow-hidden">
			<div
				class="h-full transition-all duration-500 ease-out"
				style="width: {((currentStep + 1) / steps.length) * 100}%; background: var(--vibe-mint);"
			></div>
		</div>

		<p class="text-center text-vibe-muted text-xs mt-4">
			Building your scorecard...
		</p>
	</div>
</div>
