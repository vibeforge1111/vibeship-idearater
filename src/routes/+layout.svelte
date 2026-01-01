<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';

	let { children } = $props();
	let showConsent = $state(false);

	onMount(() => {
		const consent = localStorage.getItem('analytics-consent');
		if (!consent) {
			showConsent = true;
		}
	});

	const acceptConsent = () => {
		localStorage.setItem('analytics-consent', 'accepted');
		showConsent = false;
	};
</script>

<svelte:head>
	<title>Vibeship IdeaRater - Get roasted. Get better. Get building.</title>
	<meta name="description" content="Describe your startup idea. Get a brutally honest scorecard in 30 seconds. Share it or hide it." />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
	<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="min-h-screen bg-vibe-bg flex flex-col">
	<div class="flex-1">
		{@render children()}
	</div>
	<footer class="py-8 px-4">
		<div class="max-w-2xl mx-auto">
			<div class="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
				<div class="flex items-center gap-2">
					<span class="text-vibe-mint font-semibold">vibeship</span>
					<span class="text-vibe-muted">·</span>
					<span class="text-vibe-muted">Vibe coded. For vibe coders.</span>
				</div>
				<div class="flex items-center gap-3 text-vibe-muted">
					<a href="/terms" class="hover:text-vibe-mint transition-colors">Terms</a>
					<span>·</span>
					<a href="/privacy" class="hover:text-vibe-mint transition-colors">Privacy</a>
				</div>
			</div>
		</div>
	</footer>
</div>

{#if showConsent}
	<div class="fixed bottom-0 left-0 right-0 bg-vibe-surface border-t border-vibe-border p-4">
		<div class="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
			<p class="text-vibe-muted text-xs text-center sm:text-left">
				We use Google Analytics to track usage. <span class="text-vibe-mint">Your ideas are never stored.</span> By continuing, you agree to our <a href="/privacy" class="text-vibe-mint hover:underline">Privacy Policy</a> and <a href="/terms" class="text-vibe-mint hover:underline">Terms</a>.
			</p>
			<button
				onclick={acceptConsent}
				class="px-4 py-2 bg-vibe-mint/10 border border-vibe-mint/30 text-vibe-mint text-xs hover:bg-vibe-mint/20 transition-all whitespace-nowrap"
			>
				Got it
			</button>
		</div>
	</div>
{/if}
