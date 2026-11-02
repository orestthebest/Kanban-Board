<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Kanban Board</title>
	<meta name="description" content="A simple Kanban board built with SvelteKit." />
</svelte:head>

{@render children()}