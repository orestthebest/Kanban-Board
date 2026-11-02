<script>
	let { onCreate } = $props();

	let dialog; // reference to the <dialog> element

	function handleSubmit(event) {
		event.preventDefault(); // don't reload the page

		// Read all form fields by their "name"
		const data = new FormData(event.target);

		onCreate({
			id: Date.now(),
			title: data.get('title'),
			description: data.get('description'),
			created: new Date().toISOString(),
			due: data.get('due'),
			points: Number(data.get('points')),
			priority: data.get('priority'),
			lane: 'Do'
		});

		event.target.reset();
		dialog.close();
	}
</script>

<button
	onclick={() => dialog.showModal()}
	class="rounded-md bg-stone-800 px-4 py-2 text-sm text-stone-100 hover:bg-stone-700"
>
	+ New issue
</button>

<dialog bind:this={dialog} class="m-auto w-full max-w-md rounded-lg p-6 backdrop:bg-stone-900/40">
	<h2 class="mb-4 font-serif text-xl">New issue</h2>

	<form onsubmit={handleSubmit} class="flex flex-col gap-3 text-sm">
		<input name="title" placeholder="Title" required class="rounded border-stone-300" />
		<textarea name="description" placeholder="Description" class="rounded border-stone-300"></textarea>

		<label>
			Due date
			<input name="due" type="date" required class="mt-1 w-full rounded border-stone-300" />
		</label>

		<div class="flex gap-3">
			<label class="flex-1">
				Story points
				<input name="points" type="number" min="1" value="1" class="mt-1 w-full rounded border-stone-300" />
			</label>
			<label class="flex-1">
				Priority
				<select name="priority" class="mt-1 w-full rounded border-stone-300">
					<option>Low</option>
					<option selected>Medium</option>
					<option>High</option>
				</select>
			</label>
		</div>

		<div class="mt-2 flex justify-end gap-2">
			<button type="button" onclick={() => dialog.close()} class="px-4 py-2">Cancel</button>
			<button type="submit" class="rounded-md bg-stone-800 px-4 py-2 text-stone-100">Create</button>
		</div>
	</form>
</dialog>