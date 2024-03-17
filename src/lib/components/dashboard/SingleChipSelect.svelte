<script lang="ts">
	import { saving } from '$lib/stores/unsavedChanges';
	import type { CssClasses } from '@skeletonlabs/skeleton';

	export let justify: CssClasses = 'justify-left';
	export let showIcon = true;
	export let selectedColor: CssClasses = 'variant-filled';
	export let unselectedColor: CssClasses = 'variant-ghost';
	export let onSelect: () => void = () => {};
	export let options: { value: string; label: string }[];

	export let selected: string;

	export let selectedName: string = options.filter((o) => o.value === selected)[0]?.label ?? '';

	function section(selection: string): void {
		if (selection === selectedName) {
			return;
		}
		selected = options.filter((option) => option.label === selection)[0]?.value ?? '';
		selectedName = selection;
		onSelect();
	}
</script>

<div class={`flex space-x-2 ${justify}`}>
	{#each options as o}
		<button
			disabled={$saving}
			class="chip {selectedName === o.label ? selectedColor : unselectedColor}"
			on:click={() => {
				section(o.label);
			}}
			on:keypress
		>
			{#if selectedName === o.label}<span
					>{#if showIcon}
						<i class="fa-solid fa-check" />
					{/if}</span
				>{/if}
			<span>{o.label}</span>
		</button>
	{/each}
</div>
