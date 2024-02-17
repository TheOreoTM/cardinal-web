<script lang="ts">
	import SelectOne from '$components/dashboard/SelectOne.svelte';
	import type { APIRole } from 'discord-api-types/v10';

	export let placeholder = 'Select a role...';
	export let selected: string | null | undefined;
	export let roles: APIRole[];
	export let id: string = `${Math.random()}`;
	export let disabled = false;

	const transformedRoles = roles
		.sort((a, b) => b.position - a.position)
		.map((r) => ({ value: r.id, label: r.name }));

	export let onSelected: () => void = () => {};
</script>

<SelectOne {disabled} {id} {onSelected} {placeholder} bind:selected data={transformedRoles} />
