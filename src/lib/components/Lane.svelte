<script>
	import IssueCard from './IssueCard.svelte';

	let { title, issues, onDrop } = $props();

	let isOver = $state(false); // for highlighting while dragging over

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

<section
	ondragover={handleDragOver}
	ondragleave={() => (isOver = false)}
	ondrop={handleDrop}
	class="flex min-h-96 flex-col rounded-lg p-4 transition-colors {isOver ? 'bg-stone-300/70' : 'bg-stone-200/60'}"
>
	<h2 class="mb-4 font-serif text-lg">
		{title}
		<span class="text-sm text-stone-500">({issues.length})</span>
	</h2>

	<div class="flex flex-col gap-3">
		{#each issues as issue (issue.id)}
			<IssueCard {issue} />
		{/each}
	</div>
</section>