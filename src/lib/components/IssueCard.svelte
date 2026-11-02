<script>
	let { issue } = $props();

	// Left border color depending on priority
	const colors = {
		Low: 'border-l-stone-400',
		Medium: 'border-l-amber-500',
		High: 'border-l-red-700'
	};

	// When dragging starts: remember which issue is being dragged
	function handleDragStart(event) {
		event.dataTransfer.setData('text/plain', issue.id);
	}
</script>

<article
	draggable="true"
	ondragstart={handleDragStart}
	class="cursor-grab rounded-md border-l-4 bg-white p-4 shadow-sm active:cursor-grabbing {colors[issue.priority]}"
>
	<h3 class="font-serif text-base">{issue.title}</h3>

	{#if issue.description}
		<p class="mt-1 text-sm text-stone-600">{issue.description}</p>
	{/if}

	<div class="mt-3 flex justify-between text-xs text-stone-500">
		<span>{issue.priority} · {issue.points} SP</span>
		<span>Due: {issue.due}</span>
	</div>
</article>