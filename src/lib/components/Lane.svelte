<script>
	let { title, issues } = $props();
</script>

<section class="flex min-h-96 flex-col rounded-lg bg-stone-200/60 p-4">
	<h2 class="mb-4 font-serif text-lg">
		{title}
		<span class="text-sm text-stone-500">({issues.length})</span>
	</h2>

	<div class="flex flex-col gap-3">
		{#each issues as issue (issue.id)}
			<p>{issue.title}</p>
		{/each}
	</div>
</section>