<script lang="ts">
	let flavors: Record<string, boolean> = {
		vanilla: true,
		chocolate: false,
		strawberry: false
	};

	function toggle(flavor: string): void {
		flavors[flavor] = !flavors[flavor];
	}
</script>

{#each Object.keys(flavors) as f}
	<button
		class="chip {flavors[f] ? 'variant-filled' : 'variant-soft'}"
		on:click={() => {
			toggle(f);
		}}
		on:keypress
	>
		{#if flavors[f]}<span>(icon)</span>{/if}
		<span class="capitalize">{f}</span>
	</button>
{/each}
