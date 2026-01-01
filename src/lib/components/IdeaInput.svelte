<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	interface Props {
		onSubmit: (idea: string) => void;
	}

	let { onSubmit }: Props = $props();
	let idea = $state('');
	let isFocused = $state(false);

	const exampleIdeas = [
		"An AI that writes personalized bedtime stories for kids based on their day",
		"A marketplace for people to rent out their backyards for camping",
		"A browser extension that summarizes any YouTube video in 30 seconds",
		"An app that matches remote workers with cafes that have good wifi"
	];

	const handleSubmit = () => {
		if (idea.trim()) {
			onSubmit(idea.trim());
		}
	};

	const handleExample = (example: string) => {
		idea = example;
	};

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
			handleSubmit();
		}
	};
</script>

<div class="max-w-2xl mx-auto px-4" in:fade={{ duration: 300 }}>
	<!-- Header -->
	<div class="text-center mb-12">
		<h1 class="text-4xl sm:text-5xl font-bold mb-4">
			<span class="gradient-text">Vibeship</span>
			<span class="text-vibe-text"> IdeaRater</span>
		</h1>
		<p class="text-vibe-muted text-lg">
			Get roasted. Get better. Get building.
		</p>
	</div>

	<!-- Input form -->
	<div class="terminal-box p-6 sm:p-8">
		<!-- Terminal header -->
		<div class="flex items-center gap-3 mb-6 pb-4 border-b border-vibe-border">
			<span class="text-vibe-mint">›</span>
			<span class="text-vibe-muted text-sm">idea_validator</span>
		</div>

		<label class="block mb-4">
			<span class="text-vibe-muted text-sm block mb-2">
				<span class="text-vibe-mint">$</span> Describe your startup idea in plain English
			</span>
			<textarea
				bind:value={idea}
				onfocus={() => isFocused = true}
				onblur={() => isFocused = false}
				onkeydown={handleKeydown}
				placeholder="e.g., An app that helps remote workers find the best cafes to work from..."
				rows="4"
				class="w-full p-4 bg-vibe-bg border text-vibe-text placeholder-vibe-muted/50 resize-none input-vibe transition-all {isFocused ? 'border-vibe-mint' : 'border-vibe-border'}"
			></textarea>
		</label>

		<button
			onclick={handleSubmit}
			disabled={!idea.trim()}
			class="w-full py-3 px-6 font-semibold btn-vibe disabled:opacity-50 disabled:cursor-not-allowed"
		>
			Rate My Idea →
		</button>
	</div>

	<!-- Example ideas -->
	<div class="mt-8">
		<p class="text-vibe-muted text-sm text-center mb-4">Try an example:</p>
		<div class="flex flex-wrap justify-center gap-2">
			{#each exampleIdeas as example, i}
				<button
					onclick={() => handleExample(example)}
					class="px-3 py-1.5 text-xs bg-vibe-surface border border-vibe-border text-vibe-muted hover:text-vibe-text hover:border-vibe-mint/50 transition-all truncate max-w-[200px]"
					in:fade={{ duration: 200, delay: i * 50 }}
				>
					{example.slice(0, 40)}...
				</button>
			{/each}
		</div>
	</div>

	<!-- Footer -->
	<div class="mt-12 text-center text-vibe-muted text-xs">
		<p>No signup. No email. Just brutal honesty.</p>
	</div>
</div>
