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
		if (stealthMode) {
			return `Ask me about my ${scoreCard.overallScore}/100 startup idea 👀\n\nGet your idea rated: vibeship.co/idearater`;
		}
		return `My startup idea scored ${scoreCard.overallScore}/100 on Vibeship IdeaRater\n\n"${scoreCard.killerInsight}"\n\nGet your idea rated: vibeship.co/idearater`;
	};

	const shareToX = () => {
		const text = encodeURIComponent(getShareText());
		window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
	};

	const shareToLinkedIn = () => {
		const text = encodeURIComponent(getShareText());
		window.open(`https://www.linkedin.com/sharing/share-offsite/?url=https://vibeship.co/idearater&summary=${text}`, '_blank');
	};

	const copyLink = async () => {
		copying = true;
		try {
			await navigator.clipboard.writeText(`https://vibeship.co/idearater?id=${scoreCard.id}`);
			setTimeout(() => copying = false, 2000);
		} catch {
			copying = false;
		}
	};
</script>

<div class="mt-6 space-y-4" in:fade={{ duration: 300, delay: 900 }}>
	<!-- Share buttons - all in one row -->
	<div class="flex items-center justify-center gap-3">
		<button
			onclick={() => onToggleStealth()}
			class="flex items-center gap-2 px-4 py-2 border transition-all {stealthMode ? 'bg-vibe-mint/20 border-vibe-mint text-vibe-mint' : 'bg-vibe-surface border-vibe-border text-vibe-muted hover:border-vibe-mint/50'}"
		>
			<span class="text-sm">{stealthMode ? 'Stealth' : 'Public'}</span>
		</button>

		<button
			onclick={shareToX}
			class="flex items-center gap-2 px-4 py-2 bg-vibe-surface border border-vibe-border hover:border-vibe-mint/50 hover:bg-vibe-mint/10 transition-all text-vibe-text"
		>
			<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
				<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
			</svg>
			<span class="text-sm">Share</span>
		</button>

		<button
			onclick={shareToLinkedIn}
			class="flex items-center gap-2 px-4 py-2 bg-vibe-surface border border-vibe-border hover:border-vibe-mint/50 hover:bg-vibe-mint/10 transition-all text-vibe-text"
		>
			<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
				<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
			</svg>
			<span class="text-sm">LinkedIn</span>
		</button>

		<button
			onclick={copyLink}
			class="flex items-center gap-2 px-4 py-2 bg-vibe-surface border border-vibe-border hover:border-vibe-mint/50 hover:bg-vibe-mint/10 transition-all text-vibe-text"
		>
			<span class="text-sm">{copying ? 'Copied!' : 'Copy Link'}</span>
		</button>
	</div>
</div>
