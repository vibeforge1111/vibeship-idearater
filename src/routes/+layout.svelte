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
	<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="min-h-screen bg-vibe-bg flex flex-col">
	<div class="flex-1">
		{@render children()}
	</div>
	<footer class="border-t border-vibe-border py-6 px-4">
		<div class="max-w-4xl mx-auto flex flex-col gap-5">
			<!-- Upper row -->
			<div class="flex flex-col sm:flex-row justify-between items-center gap-4">
				<div class="flex items-center gap-6 text-xs">
					<a href="https://scanner.vibeship.co" target="_blank" class="text-vibe-muted hover:text-vibe-mint transition-colors">Scanner</a>
					<a href="https://mind.vibeship.co" target="_blank" class="text-vibe-muted hover:text-vibe-mint transition-colors">Mind</a>
					<a href="https://spawner.vibeship.co" target="_blank" class="text-vibe-muted hover:text-vibe-mint transition-colors">Spawner</a>
					<a href="https://vibeship.co" target="_blank" class="text-vibe-muted hover:text-vibe-mint transition-colors">Ecosystem</a>
				</div>
				<div class="flex items-center gap-3">
					<a href="https://github.com/vibeforge1111" target="_blank" class="flex items-center gap-2 px-3 py-1.5 text-xs text-vibe-muted border border-vibe-border hover:border-vibe-mint hover:text-vibe-mint transition-all">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
							<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
						</svg>
						GitHub
					</a>
					<a href="https://x.com/vibeshipco" target="_blank" class="flex items-center justify-center w-8 h-8 text-vibe-muted border border-vibe-border hover:border-vibe-mint hover:text-vibe-mint transition-all" aria-label="X">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
							<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
						</svg>
					</a>
				</div>
			</div>
			<!-- Lower row -->
			<div class="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-vibe-border">
				<a href="https://vibeship.co" target="_blank" class="flex items-center gap-1 text-vibe-text hover:text-vibe-mint transition-colors">
					<img src="/logo.png" alt="vibeship" class="w-[22px] h-[22px] brightness-0 invert" />
					<span style="font-family: 'Instrument Serif', Georgia, serif;" class="text-base">vibeship</span>
				</a>
				<div class="flex items-center gap-2 text-[11px] text-vibe-muted">
					<a href="/terms" class="hover:text-vibe-mint transition-colors">Terms</a>
					<span class="opacity-50">·</span>
					<a href="/privacy" class="hover:text-vibe-mint transition-colors">Privacy</a>
					<span class="opacity-50">·</span>
					<span>Vibe coded. For vibe coders.</span>
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
