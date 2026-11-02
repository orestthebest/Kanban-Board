<script>
	import Lane from '$lib/components/Lane.svelte';
	import IssueDialog from '$lib/components/IssueDialog.svelte';
	import { loadIssues, saveIssues } from '$lib/storage.js';
    import { notifyDone } from '$lib/notify.js';
    import { exportCsv } from '$lib/export.js';

	const lanes = ['Do', 'Doing', 'Done', 'Archive'];

	// All issues: loaded from localStorage on start
	let issues = $state(loadIssues());

	// Save automatically on every change
	$effect(() => {
		saveIssues(issues);
	});

	function addIssue(issue) {
		issues.push(issue);
	}

    // Move an issue to another lane
	function moveIssue(id, lane) {
		const issue = issues.find((i) => i.id === id);

        // Only notify if it wasn't already in Done
		if (lane === 'Done' && issue.lane !== 'Done') {
			notifyDone(issue.title);
		}

		issue.lane = lane;
	}
</script>

<header class="flex items-center justify-between border-b border-stone-300 px-8 py-6">
	<div>
		<h1 class="font-serif text-3xl">Kanban Board</h1>
		<p class="text-sm text-stone-500">Plan, move, finish.</p>
	</div>
	<div class="flex gap-2">
		<button
			onclick={() => exportCsv(issues)}
			class="rounded-md border border-stone-400 px-4 py-2 text-sm hover:bg-stone-200"
		>
			Export CSV
		</button>
		<IssueDialog onCreate={addIssue} />
	</div>
</header>

<main class="grid grid-cols-1 gap-6 p-8 md:grid-cols-2 xl:grid-cols-4">
	{#each lanes as lane (lane)}
		<Lane title={lane} issues={issues.filter((i) => i.lane === lane)} onDrop={moveIssue} />
	{/each}
</main>