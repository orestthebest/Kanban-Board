<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Kanban Board</title>
	<meta name="description" content="Ein einfaches Kanban-Board mit SvelteKit." />
</svelte:head>

{@render children()}