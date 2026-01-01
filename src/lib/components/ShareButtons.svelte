<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { ScoreCard } from '$lib/types';

	interface Props {
		scoreCard: ScoreCard;
		stealthMode: boolean;
		onToggleStealth: () => void;
	}

	let { scoreCard, stealthMode, onToggleStealth }: Props = $props();
	let copying = $state(false);

	const getShareText = (): string => {
		const score = scoreCard.pmfScore;

		if (stealthMode) {
			if (score >= 70) return `My startup idea just scored ${score}/100. Feeling dangerous.\n\nThink yours can beat it? → idearater.vibeship.co`;
			if (score >= 50) return `${score}/100 on the IdeaRater. Not bad, not done.\n\nWhat's your score? → idearater.vibeship.co`;
			return `${score}/100. Brutal, but fair.\n\nGet roasted too → idearater.vibeship.co`;
		}

		if (score >= 70) return `${score}/100 PMF score. The idea hits.\n\nRate yours → idearater.vibeship.co`;
		if (score >= 50) return `${score}/100. Room to grow, but there's something here.\n\nGet your score → idearater.vibeship.co`;
		return `${score}/100. Back to the drawing board.\n\nHow bad is yours? → idearater.vibeship.co`;
	};

	const shareToX = () => {
		const text = encodeURIComponent(getShareText());
		window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
	};

	const shareToLinkedIn = () => {
		const text = encodeURIComponent(getShareText());
		window.open(`https://www.linkedin.com/sharing/share-offsite/?url=https://idearater.vibeship.co&summary=${text}`, '_blank');
	};

	const copyLink = async () => {
		copying = true;
		try {
			await navigator.clipboard.writeText(`https://idearater.vibeship.co?id=${scoreCard.id}`);
			setTimeout(() => copying = false, 2000);
		} catch {
			copying = false;
		}
	};
</script>

<!-- Share buttons inline -->
<div class="flex items-center gap-2 flex-wrap" in:fade={{ duration: 300, delay: 500 }}>
	<button
		onclick={() => onToggleStealth()}
		class="flex items-center gap-2 px-3 py-2 border transition-all text-sm font-mono {stealthMode ? 'bg-vibe-yc/20 border-vibe-yc text-vibe-yc' : 'bg-vibe-surface border-vibe-border text-vibe-muted hover:border-vibe-yc/50 hover:text-vibe-yc'}"
	>
		<span class="text-vibe-yc">[</span>{stealthMode ? 'stealth: on' : 'stealth: off'}<span class="text-vibe-yc">]</span>
	</button>

	<button
		onclick={shareToX}
		class="flex items-center gap-2 px-3 py-2 bg-vibe-surface border border-vibe-border hover:border-vibe-mint/50 hover:bg-vibe-mint/10 transition-all text-vibe-text text-sm"
	>
		<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
			<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
		</svg>
		Share
	</button>

	<button
		onclick={shareToLinkedIn}
		class="flex items-center gap-2 px-3 py-2 bg-vibe-surface border border-vibe-border hover:border-vibe-mint/50 hover:bg-vibe-mint/10 transition-all text-vibe-text text-sm"
	>
		<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
			<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
		</svg>
		LinkedIn
	</button>

	<button
		onclick={copyLink}
		class="flex items-center gap-2 px-3 py-2 bg-vibe-surface border border-vibe-border hover:border-vibe-mint/50 hover:bg-vibe-mint/10 transition-all text-vibe-text text-sm"
	>
		{copying ? 'Copied!' : 'Copy'}
	</button>
</div>
