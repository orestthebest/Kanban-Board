<script>
	import IssueCard from './IssueCard.svelte';

	let { title, issues, onDrop } = $props();

	let isOver = $state(false); // for highlighting while dragging over

	// Sum of all story points in this lane
	let totalPoints = $derived(issues.reduce((sum, issue) => sum + issue.points, 0));

	function handleDragOver(event) {
		event.preventDefault(); // needed, otherwise dropping is not allowed
		isOver = true;
	}

	function handleDrop(event) {
		event.preventDefault();
		isOver = false;
		const id = Number(event.dataTransfer.getData('text/plain'));
		onDrop(id, title);
	}
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<section
	ondragover={handleDragOver}
	ondragleave={() => (isOver = false)}
	ondrop={handleDrop}
	class="flex min-h-96 flex-col rounded-lg p-4 transition-colors {isOver ? 'bg-stone-300/70' : 'bg-stone-200/60'}"
>
	<div class="mb-4 flex items-baseline justify-between">
		<h2 class="font-serif text-lg">
			{title}
			<span class="text-sm text-stone-500">({issues.length})</span>
		</h2>
		<span class="text-sm text-stone-500">{totalPoints} SP</span>
	</div>

	<div class="flex flex-col gap-3">
		{#each issues as issue (issue.id)}
			<IssueCard {issue} />
		{/each}
	</div>
</section>