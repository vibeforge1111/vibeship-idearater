<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	interface Props {
		onSubmit: (idea: string) => void;
	}

	let { onSubmit }: Props = $props();
	let idea = $state('');
	let isFocused = $state(false);

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
		<p class="text-vibe-muted text-lg">
			Test if your idea has PMF potential.
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

	<!-- Footer -->
	<div class="mt-12 text-center text-vibe-muted text-xs space-y-2">
		<p>PMF = Product-Market Fit</p>
		<p>No signup. No email. Just brutal honesty.</p>
	</div>
</div>
