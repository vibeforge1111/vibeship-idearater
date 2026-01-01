<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	const steps: string[] = [
		'Finding your customers',
		'Sizing your market',
		'Scanning competitors',
		'Checking YC fit',
		'Generating verdict'
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
		<div class="flex items-center gap-3 mb-6 pb-4 border-b border-vibe-border">
			<span class="text-vibe-mint">›</span>
			<span class="text-vibe-muted text-sm">analyzing_idea.sh</span>
		</div>

		<!-- Progress steps -->
		<div class="space-y-3">
			{#each steps as step, i}
				<div
					class="flex items-center gap-3 transition-all duration-300 font-mono text-sm"
					class:opacity-40={i > currentStep}
					class:opacity-100={i <= currentStep}
				>
					{#if completedSteps.includes(i)}
						<span class="text-vibe-mint" in:fade={{ duration: 200 }}>[✓]</span>
					{:else if i === currentStep}
						<span class="text-vibe-mint animate-pulse">[~]</span>
					{:else}
						<span class="text-vibe-muted">[ ]</span>
					{/if}

					<span
						class:text-vibe-text={i <= currentStep}
						class:text-vibe-muted={i > currentStep}
					>
						{step}{i === currentStep ? '...' : ''}
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
