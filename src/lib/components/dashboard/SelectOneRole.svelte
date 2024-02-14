<script lang="ts">
	import SelectOne from '$components/dashboard/SelectOne.svelte';
	import type { APIRole } from 'discord-api-types/v10';

	export let selected: string;
	export let roles: APIRole[];
	export let id: string = `${Math.random()}`;

	export let onSelected: () => void = () => {};
</script>

<SelectOne
	{id}
	{onSelected}
	bind:selected
	data={roles
		.sort((a, b) => b.position - a.position)
		.map((r) => ({ id: r.id, label: r.name }))}
/>
