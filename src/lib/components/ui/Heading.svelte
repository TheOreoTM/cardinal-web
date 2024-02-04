<script>
	export let title = '';
	export let description = '';
	export let centered = false;
</script>

<div class:text-center={centered}>
	{#if title}
		<h2 class="text-2xl md:text-4xl font-special font-semibold tracking-tight">
			{title}
		</h2>
	{/if}
	{#if description}
		<p class="text-sm md:text-base mt-1">
			{description}
		</p>
	{/if}
	<hr class="my-6 border-t-2 border-gray-200" />
</div>
