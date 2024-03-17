<script lang="ts">
	import SelectOne from '$components/dashboard/SelectOne.svelte';
	import type { APIGuildChannel } from 'discord-api-types/v10';

	export let placeholder = 'Select a channel...';
	export let selected: string | null | undefined;
	export let channels: APIGuildChannel<any>[];
	export let id: string = `${Math.random()}`;

	export let onSelected: () => void = () => {};
</script>

<SelectOne
	{id}
	{onSelected}
	{placeholder}
	bind:selected
	data={channels.sort((a, b) => b.position - a.position).map((r) => ({ value: r.id, label: r.name }))}
/>
