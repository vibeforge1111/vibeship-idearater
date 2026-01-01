<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	interface Props {
		onSubmit: (idea: string) => void;
	}

	let { onSubmit }: Props = $props();
	let idea = $state('');
	let isFocused = $state(false);

	// Typing animation state
	const terminalText = 'PMF_validator';
	let typedText = $state('');
	let showCursor = $state(true);
	let cursorColorIndex = $state(0);
	const cursorColors = ['text-vibe-mint', 'text-white'];

	onMount(() => {
		// Typing animation
		let charIndex = 0;
		const typeInterval = setInterval(() => {
			if (charIndex < terminalText.length) {
				typedText = terminalText.slice(0, charIndex + 1);
				charIndex++;
			} else {
				clearInterval(typeInterval);
			}
		}, 100);

		// Cursor blink with color changes - slower
		const cursorInterval = setInterval(() => {
			showCursor = !showCursor;
			if (showCursor) {
				cursorColorIndex = (cursorColorIndex + 1) % cursorColors.length;
			}
		}, 700);

		return () => {
			clearInterval(typeInterval);
			clearInterval(cursorInterval);
		};
	});

	const handleSubmit = () => {
		if (idea.trim()) {
			onSubmit(idea.trim());
		}
	};

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
			handleSubmit();
		}
	};
</script>

<div class="max-w-2xl mx-auto px-4 pt-12 sm:pt-32" in:fade={{ duration: 300 }}>
	<!-- Header -->
	<div class="text-center mb-12">
		<h1 class="text-4xl sm:text-5xl font-bold mb-4">
			<span class="gradient-text">Vibeship</span>
			<span class="text-vibe-text"> IdeaRater</span>
		</h1>
		<p class="text-vibe-text/80 text-lg">
			Test if your idea has PMF potential.
		</p>
	</div>

	<!-- Input form -->
	<div class="terminal-box p-6 sm:p-8">
		<!-- Terminal header with typing animation -->
		<div class="flex items-center gap-3 mb-6 pb-4 border-b border-vibe-border">
			<span class="text-vibe-mint">›</span>
			<div class="flex items-center">
				<span class="text-vibe-mint font-mono text-sm">{typedText}</span>
				{#if showCursor}
					<span class="font-mono text-sm ml-[2px] {cursorColors[cursorColorIndex]}">█</span>
				{:else}
					<span class="font-mono text-sm ml-[2px] opacity-0">█</span>
				{/if}
			</div>
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

	<!-- Footer -->
	<div class="mt-12 text-center text-vibe-muted text-xs space-y-2">
		<p>PMF = Product-Market Fit</p>
		<p>No signup. No email. Just brutal honesty.</p>
	</div>
</div>
