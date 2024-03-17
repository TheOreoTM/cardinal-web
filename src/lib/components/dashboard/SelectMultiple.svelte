<script lang="ts">
	import { Autocomplete, InputChip, popup } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption, CssClasses, PopupSettings } from '@skeletonlabs/skeleton';

	export let placeholder = 'Select values...';
	export let data: { label: string; id: string }[];
	export let chips: CssClasses = 'variant-filled-surface';
	export let allowDuplicates = false;

	/** This is round about way to fix the issue of it showing the value and not showing the label for the user*/

	// binded value - should only have ID
	export let selected: string[] = [];
	// non binded value - should only have names
	let selectedOptionNames: string[] = data.filter((i) => selected.includes(i.id)).map((i) => i.label);

	let inputChip = '';

	const options: AutocompleteOption[] = data.map((item) => ({
		label: item.label.toLowerCase(),
		value: item.label,
		meta: { id: item.id }
	}));

	function isValidInput(value: string): boolean {
		return data.some((item) => item.label.toLowerCase() === value.toLowerCase());
	}

	function onInputChipRemove(
		event: CustomEvent<{
			event: MouseEvent;
			chipIndex: number;
			chipValue: string;
		}>
	): void {
		selected.splice(event.detail.chipIndex, 1);
	}

	function onInputChipSelect(event: CustomEvent<AutocompleteOption>): void {
		if (selected.includes(event.detail.value as string) === false) {
			selected = [...selected, (event.detail.meta as { id: string }).id];
			selectedOptionNames = [...selectedOptionNames, event.detail.value as string];
			inputChip = '';
		}
	}
	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom'
	};
</script>

<div use:popup={popupSettings}>
	<InputChip
		{allowDuplicates}
		{placeholder}
		bind:input={inputChip}
		bind:value={selectedOptionNames}
		on:remove={onInputChipRemove}
		validation={isValidInput}
		name="chips"
		{chips}
	/>
</div>

<div class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto" tabindex="-1" data-popup="popupAutocomplete">
	<Autocomplete
		bind:input={inputChip}
		{options}
		denylist={selectedOptionNames}
		on:selection={onInputChipSelect}
	/>
</div>
