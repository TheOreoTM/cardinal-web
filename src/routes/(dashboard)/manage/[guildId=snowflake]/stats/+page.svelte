<script lang="ts">
	import Meta from '$components/Meta.svelte';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import Label from '$components/forms/Label.svelte';
	import SettingsCard from '$components/dashboard/SettingsCard.svelte';

	export let data: PageData;

	let defaults = {
		enabled: true
	};

	let values = {
		enabled: true
	};

	let uc = {
		module: false
	};
</script>

<Meta title="Stats" guildName={data.guild.name} />

<h2 id="main" class="h2">Moderation</h2>
<div class="space-y-6">
	<SettingsCard title="Module" documentation={true}>
		<p>Prevent users from adding random characters to the front of their name to appear at the top of the member list.</p>
		<Label id="module-enabled" title="Enable/Disable">
			<SlideToggle
				label="module-enabled"
				name="module-enabled"
				size="sm"
				value="true"
				bind:checked={values.enabled}
				on:change={() => {
					uc.module = defaults.enabled !== values.enabled;
				}}
			/>
		</Label>
	</SettingsCard>
</div>
