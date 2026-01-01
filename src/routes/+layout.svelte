<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<title>Vibeship IdeaRater - Get roasted. Get better. Get building.</title>
	<meta name="description" content="Describe your startup idea. Get a brutally honest scorecard in 30 seconds. Share it or hide it." />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
	<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="min-h-screen bg-vibe-bg">
	{@render children()}
</div>
