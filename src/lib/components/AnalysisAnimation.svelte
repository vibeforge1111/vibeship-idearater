<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	const steps: string[] = [
		'Analyzing the problem',
		'Sizing your market',
		'Evaluating solution fit',
		'Checking timing',
		'Assessing uniqueness',
		'Modeling revenue',
		'Testing scalability',
		'Building your moat',
		'Generating PMF score'
	];

	let currentStep = $state(0);
	let completedSteps = $state<number[]>([]);
	let typedText = $state('');
	let showCursor = $state(true);
	const terminalText = 'PMF_validator';

	onMount(() => {
		// Typing animation for header
		let charIndex = 0;
		const typeInterval = setInterval(() => {
			if (charIndex < terminalText.length) {
				typedText = terminalText.slice(0, charIndex + 1);
				charIndex++;
			} else {
				clearInterval(typeInterval);
			}
		}, 60);

		// Cursor blink
		const cursorInterval = setInterval(() => {
			showCursor = !showCursor;
		}, 600);

		// Step progress - start after typing completes
		setTimeout(() => {
			const stepInterval = setInterval(() => {
				if (currentStep < steps.length - 1) {
					completedSteps = [...completedSteps, currentStep];
					currentStep++;
				}
			}, 900);

			return () => clearInterval(stepInterval);
		}, 800);

		return () => {
			clearInterval(typeInterval);
			clearInterval(cursorInterval);
		};
	});
</script>

<div class="flex flex-col items-center justify-center min-h-[70vh] py-8">
	<div class="terminal-box w-full max-w-md">
		<!-- Terminal window header with dots -->
		<div class="flex items-center gap-2 px-4 py-3 border-b border-vibe-border bg-vibe-bg">
			<div class="w-3 h-3 rounded-full bg-vibe-red"></div>
			<div class="w-3 h-3 rounded-full bg-vibe-yellow"></div>
			<div class="w-3 h-3 rounded-full bg-vibe-green"></div>
			<span class="ml-2 text-vibe-muted text-xs">vibeship</span>
		</div>

		<div class="p-6">
			<!-- Terminal command line -->
			<div class="flex items-center gap-2 mb-6 pb-4 border-b border-vibe-border/50">
				<span class="text-vibe-mint">$</span>
				<span class="text-vibe-mint font-mono text-sm">{typedText}</span>
				{#if showCursor}
					<span class="text-vibe-mint font-mono">█</span>
				{:else}
					<span class="text-vibe-mint font-mono opacity-0">█</span>
				{/if}
			</div>

			<!-- Progress steps -->
			<div class="space-y-2.5">
				{#each steps as step, i}
					<div
						class="flex items-center gap-3 transition-all duration-300 font-mono text-sm"
						class:opacity-30={i > currentStep}
						class:opacity-100={i <= currentStep}
					>
						{#if completedSteps.includes(i)}
							<span class="text-vibe-mint w-6" in:fade={{ duration: 150 }}>[✓]</span>
						{:else if i === currentStep}
							<span class="text-vibe-mint w-6 animate-pulse">[~]</span>
						{:else}
							<span class="text-vibe-muted w-6">[ ]</span>
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
			<div class="mt-6 h-1.5 bg-vibe-border/50 overflow-hidden">
				<div
					class="h-full transition-all duration-700 ease-out"
					style="width: {((currentStep + 1) / steps.length) * 100}%; background: var(--vibe-mint);"
				></div>
			</div>

			<!-- Status line -->
			<div class="mt-4 flex items-center justify-between text-xs">
				<span class="text-vibe-muted font-mono">Building scorecard...</span>
				<span class="text-vibe-mint font-mono">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
			</div>
		</div>
	</div>
</div>
