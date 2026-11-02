<script>
	import { format, formatDistanceToNow, parseISO, isBefore, startOfToday } from 'date-fns';

	let { issue } = $props();

	// Left border color depending on priority
	const colors = {
		Low: 'border-l-stone-400',
		Medium: 'border-l-amber-500',
		High: 'border-l-red-700'
	};

	// Overdue = due date is before today and the issue is not finished
	let overdue = $derived(
		isBefore(parseISO(issue.due), startOfToday()) &&
			issue.lane !== 'Done' &&
			issue.lane !== 'Archive'
	);

	// When dragging starts: remember which issue is being dragged
	function handleDragStart(event) {
		event.dataTransfer.setData('text/plain', issue.id);
	}
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<article
	draggable="true"
	ondragstart={handleDragStart}
	class="cursor-grab rounded-md border-l-4 bg-white p-4 shadow-sm active:cursor-grabbing {colors[issue.priority]} {overdue ? 'ring-1 ring-red-700/50' : ''}"
>
	<h3 class="font-serif text-base">{issue.title}</h3>

	{#if issue.description}
		<p class="mt-1 text-sm text-stone-600">{issue.description}</p>
	{/if}

	{#if overdue}
		<p class="mt-2 text-xs font-medium text-red-700">⚠ Overdue</p>
	{/if}

	<div class="mt-3 flex justify-between text-xs text-stone-500">
		<span>{issue.priority} · {issue.points} SP</span>
		<span>Due {format(parseISO(issue.due), 'dd.MM.yyyy')}</span>
	</div>
	<p class="mt-1 text-xs text-stone-400">
		Created {formatDistanceToNow(parseISO(issue.created), { addSuffix: true })}
	</p>
</article>