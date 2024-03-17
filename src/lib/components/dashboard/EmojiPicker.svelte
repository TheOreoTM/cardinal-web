<script lang="ts">
	import { onMount } from 'svelte';
	import data from '@emoji-mart/data';
	import * as em from 'emoji-mart';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { saving } from '$lib/stores/unsavedChanges';

	export let selected: string | null;
	export let onSelected: () => void;

	let el: HTMLElement | null;
	onMount(() => {
		const picker = new em.Picker({
			previewPosition: 'none',
			data,
			onEmojiSelect: (emoji: any) => {
				selected = emoji.native;
				onSelected();
			}
		}) as unknown as Node;
		el?.appendChild(picker);
	});

	const emojiPickerPopup: PopupSettings = {
		event: 'click',
		target: 'emoji-picker',
		placement: 'bottom'
	};
</script>

<button disabled={$saving} class="btn-icon variant-ghost rounded-md" use:popup={emojiPickerPopup}>
	{selected}
</button>
<div data-popup="emoji-picker" class="z-50">
	<div bind:this={el} />
</div>
