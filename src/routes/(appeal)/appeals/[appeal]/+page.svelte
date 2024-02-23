<script lang="ts">
	import SingleChipSelect from '$components/dashboard/SingleChipSelect.svelte';
	import Heading from '$components/ui/Heading.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const appeal = data.appeal;

	function capitalize(string: string) {
		return `${string[0].toUpperCase()}${string.slice(1)}`
	}
</script>

<Heading title={`Appeal #${appeal.idx} - ${capitalize(appeal.status)}`} />

<div class="flex-col flex space-y-6">
	<div class="flex flex-col space-y-4">
		<span class="h5">1. Were you muted or banned?</span>
		<SingleChipSelect
			disabled
			options={[
				{ label: 'Muted', value: 'mute' },
				{ label: 'Banned', value: 'ban' }
			]}
			bind:selected={appeal.muteOrBan}
		/>
	</div>
	<div class="flex flex-col space-y-4">
		<span class="h5">2. Why were you muted or banned?</span>
		<textarea disabled class="textarea" rows="1" bind:value={appeal.reason} />
	</div>

	<div class="flex flex-col space-y-4">
		<span class="h5">3. Why do you believe your appeal should be accepted?</span>
		<textarea disabled class="textarea" rows="4" bind:value={appeal.appeal} />
	</div>

	<div class="flex flex-col space-y-4">
		<span class="h5">4. Is there anything else you would like for us to know?</span>
		<textarea disabled class="textarea" rows="4" bind:value={appeal.extra} />
	</div>
</div>

