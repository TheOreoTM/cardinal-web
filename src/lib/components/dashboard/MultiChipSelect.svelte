<script lang="ts">
	import { saving } from '$lib/stores/unsavedChanges';

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
		disabled={$saving}
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
