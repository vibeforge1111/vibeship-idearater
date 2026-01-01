<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import IdeaInput from '$lib/components/IdeaInput.svelte';
	import AnalysisAnimation from '$lib/components/AnalysisAnimation.svelte';
	import ScoreCard from '$lib/components/ScoreCard.svelte';
	import ShareButtons from '$lib/components/ShareButtons.svelte';
	import SpawnerRecommendations from '$lib/components/SpawnerRecommendations.svelte';
	import type { ScoreCard as ScoreCardType } from '$lib/types';

	type AppState = 'input' | 'analyzing' | 'result';

	let appState = $state<AppState>('input');
	let currentIdea = $state('');
	let scoreCard = $state<ScoreCardType | null>(null);
	let stealthMode = $state(false);
	let error = $state<string | null>(null);

	const handleSubmit = async (idea: string) => {
		currentIdea = idea;
		appState = 'analyzing';
		error = null;

		try {
			const response = await fetch('/api/analyze', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ idea })
			});

			if (!response.ok) {
				const data = await response.json();
				throw new Error(data.error || 'Failed to analyze idea');
			}

			const result = await response.json();
			scoreCard = result;

			// Small delay for dramatic effect
			await new Promise(resolve => setTimeout(resolve, 500));
			appState = 'result';
		} catch (err) {
			error = err instanceof Error ? err.message : 'Something went wrong';
			appState = 'input';
		}
	};

	const handleReset = () => {
		appState = 'input';
		scoreCard = null;
		currentIdea = '';
		stealthMode = false;
		error = null;
	};

	const toggleStealth = () => {
		stealthMode = !stealthMode;
	};
</script>

<main class="min-h-screen py-12 sm:py-20">
	{#if appState === 'input'}
		<div in:fade={{ duration: 300 }}>
			<IdeaInput onSubmit={handleSubmit} />
			{#if error}
				<div class="max-w-md mx-auto mt-4 p-4 bg-vibe-red/10 border border-vibe-red/30 text-vibe-red text-sm text-center">
					{error}
				</div>
			{/if}
		</div>
	{:else if appState === 'analyzing'}
		<div in:fade={{ duration: 300 }}>
			<AnalysisAnimation />
		</div>
	{:else if appState === 'result' && scoreCard}
		<div class="max-w-2xl mx-auto px-4 pt-8 sm:pt-12" in:fade={{ duration: 300 }}>
			<p class="text-vibe-muted text-xs text-center mb-4">Screenshot your scorecard and share it. Use stealth mode to hide your idea.</p>
			<ScoreCard {scoreCard} {stealthMode} />

			<!-- Share and actions row -->
			<div class="mt-6 flex items-center justify-between gap-2 flex-wrap">
				<ShareButtons {scoreCard} {stealthMode} onToggleStealth={toggleStealth} />
				<button
					onclick={handleReset}
					class="px-3 py-2 bg-vibe-surface border border-vibe-border hover:border-vibe-mint/50 hover:bg-vibe-mint/10 transition-all text-vibe-text text-sm"
				>
					Rate Another Idea
				</button>
			</div>

			<SpawnerRecommendations {scoreCard} />
		</div>
	{/if}
</main>
