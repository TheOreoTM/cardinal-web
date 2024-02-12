<script lang="ts">
	export let isOdd: boolean = false;
</script>

<div
	class="flex flex-col md:flex-row text-white text-center md:text-left mx-auto w-full items-center"
>
	{#if isOdd}
		<div class="flex flex-col gap-y-4 mb-8">
			<h2 class="h2 font-semibold md:text-center lg:text-left">
				<slot name="header" />
				<hr class="!my-2 lg:w-[30%] md:w-[50%] lg:mx-0 md:mx-auto" />
			</h2>
			<p class="text-white text-sm">
				<slot name="body" />
			</p>
		</div>
		<div class="md:order-1 m-8">
			<slot name="preview" />
		</div>
	{:else}
		<div class="flex flex-col gap-y-4 mb-8 md:order-2 md:ml-auto">
			<h2 class="h2 font-semibold md:text-center lg:text-left">
				<slot name="header" />
				<hr class="!my-2 lg:w-[30%] md:w-[50%] lg:mx-0 md:mx-auto" />
			</h2>
			<p class="text-white text-sm">
				<slot name="body" />
			</p>
		</div>
		<div class="md:ml-auto m-8">
			<slot name="preview" />
		</div>
	{/if}
</div>
