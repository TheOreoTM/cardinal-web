<script lang="ts">
	import type { SelectOption } from '$lib/types';
	import { Autocomplete, popup } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption, PopupSettings } from '@skeletonlabs/skeleton';

	export let placeholder = 'Select value...';
	export let data: SelectOption[];
	export let onSelected: () => void;
	export let id: string;
	export let disabled = false;

	/** This is round about way to fix the issue of it showing the value and not showing the label for the user*/

	// binded value - should only have ID
	export let selected: string | null = null;
	// non binded value - should only have names
	let selectedOptionName: string = data.filter((i) => selected?.includes(i.value))[0]?.label ?? '';

	const options: AutocompleteOption[] = data.map((item) => ({
		label: item.label,
		value: item.label,
		meta: { id: item.value }
	}));

	// function isValidInput(value: string): boolean {
	// 	return data.some(
	// 		(item) => item.label.toLowerCase() === value.toLowerCase()
	// 	);
	// }

	function onSelectOption(event: CustomEvent<AutocompleteOption>): void {
		selected = (event.detail.meta as { id: string }).id;
		selectedOptionName = event.detail.label;
		onSelected();
	}

	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: `popupAutocomplete-${id}`,
		placement: 'bottom'
	};
</script>

<input
	class="input autocomplete hover:cursor-pointer"
	type="search"
	name={`autocomplete-search-${id}`}
	{disabled}
	{id}
	{placeholder}
	bind:value={selectedOptionName}
	use:popup={popupSettings}
/>
<div
	class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto"
	tabindex="-1"
	data-popup={`popupAutocomplete-${id}`}
>
	<Autocomplete bind:input={selectedOptionName} {options} on:selection={onSelectOption} />
</div>
