<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

<div class="max-w-2xl mx-auto px-4 py-12 sm:py-20" in:fade={{ duration: 300 }}>
	<div class="terminal-box p-6 sm:p-8">
		<div class="flex items-center gap-3 mb-6 pb-4 border-b border-vibe-border">
			<span class="text-vibe-mint">$</span>
			<span class="text-vibe-muted text-sm">privacy_policy</span>
		</div>

		<h1 class="text-2xl font-bold text-vibe-text mb-6">Privacy Policy</h1>
		<p class="text-vibe-muted text-xs mb-6">Last updated: January 2026</p>

		<div class="space-y-6 text-vibe-text text-sm">
			<section>
				<h2 class="text-vibe-mint font-semibold mb-2">What We Collect</h2>
				<ul class="list-disc list-inside text-vibe-muted space-y-1">
					<li><span class="text-vibe-text">Analytics data</span> - We use Google Analytics to understand how visitors use our site (pages visited, time on site, general location). This data is anonymized.</li>
					<li><span class="text-vibe-text">IP addresses</span> - Temporarily used for rate limiting (10 requests/day). Not stored permanently.</li>
				</ul>
			</section>

			<section>
				<h2 class="text-vibe-mint font-semibold mb-2">What We Don't Collect</h2>
				<ul class="list-disc list-inside text-vibe-muted space-y-1">
					<li><span class="text-vibe-text">Your ideas</span> - We do not store, log, or retain any startup ideas you submit. Ideas are processed in real-time and immediately discarded.</li>
					<li><span class="text-vibe-text">Personal information</span> - No accounts, no emails, no names.</li>
					<li><span class="text-vibe-text">Cookies</span> - We only use essential cookies for analytics consent.</li>
				</ul>
			</section>

			<section>
				<h2 class="text-vibe-mint font-semibold mb-2">Third-Party Services</h2>
				<ul class="list-disc list-inside text-vibe-muted space-y-1">
					<li><span class="text-vibe-text">Google Analytics</span> - For website analytics. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener" class="text-vibe-mint hover:underline">Google's Privacy Policy</a></li>
					<li><span class="text-vibe-text">Anthropic (Claude AI)</span> - Powers our idea analysis. Ideas are sent to their API for processing. <a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener" class="text-vibe-mint hover:underline">Anthropic's Privacy Policy</a></li>
					<li><span class="text-vibe-text">Railway</span> - Our hosting provider. <a href="https://railway.app/legal/privacy" target="_blank" rel="noopener" class="text-vibe-mint hover:underline">Railway's Privacy Policy</a></li>
				</ul>
			</section>

			<section>
				<h2 class="text-vibe-mint font-semibold mb-2">Your Rights (GDPR)</h2>
				<p class="text-vibe-muted">Since we don't store personal data or ideas, there's nothing to delete or export. You can clear your browser's localStorage to reset your analytics consent preference.</p>
			</section>

			<section>
				<h2 class="text-vibe-mint font-semibold mb-2">Contact</h2>
				<p class="text-vibe-muted">Questions? Reach out at <a href="mailto:hello@vibeship.co" class="text-vibe-mint hover:underline">hello@vibeship.co</a></p>
			</section>
		</div>

		<div class="mt-8 pt-4 border-t border-vibe-border">
			<a href="/" class="text-vibe-mint text-sm hover:underline">&larr; Back to IdeaRater</a>
		</div>
	</div>
</div>
