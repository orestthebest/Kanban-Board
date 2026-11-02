<script>
	import Lane from '$lib/components/Lane.svelte';
	import { loadIssues, saveIssues } from '$lib/storage.js';

	const lanes = ['Do', 'Doing', 'Done', 'Archive'];

	// All issues: loaded from localStorage on start
	let issues = $state(loadIssues());

	// Save automatically on every change
	$effect(() => {
		saveIssues(issues);
	});
</script>

<header class="border-b border-stone-300 px-8 py-6">
	<h1 class="font-serif text-3xl">Kanban Board</h1>
	<p class="text-sm text-stone-500">Plan, move, finish.</p>
</header>

<main class="grid grid-cols-1 gap-6 p-8 md:grid-cols-2 xl:grid-cols-4">
	{#each lanes as lane}
		<Lane title={lane} issues={issues.filter((i) => i.lane === lane)} />
	{/each}
</main>