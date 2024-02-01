<script lang="ts">
	import Meta from '$components/Meta.svelte';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import Label from '$components/forms/Label.svelte';
	import SettingsCard from '$components/dashboard/SettingsCard.svelte';
	import SettingsRow from '$components/dashboard/SettingsRow.svelte';
	import TextChannelList from '$components/dashboard/TextChannelList.svelte';
	import { getExtendedToastStore } from '$lib/utils/toast';
	import { save } from '$lib/utils/saveLogic';

	const toast = getExtendedToastStore();

	function saveSuccessful() {
		toast.success('Saved settings successfully');
	}

	function saveFailed() {
		toast.error('Failed to save settings');
	}

	function handleSave() {
		save(guild.id, 'stats', values, saveSuccessful, saveFailed);
	}

	export let data: PageData;

	const channels = data.channels;
	const guild = data.guild;

	let defaults = {
		enabled: true,
		reportChannelId: '856722573576765450',
		antihoistEnabled: false
	};

	let values = {
		...defaults
	};

	let uc = {
		enabled: false,
		report: false,
		antihoist: false
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
				on:change={handleSave}
			/>
		</Label>
	</SettingsCard>

	<SettingsRow>
		<SettingsCard title="Anti-Hoist">
			<p>Prevent users from adding random characters to the front of their name to appear at the top of the member list.</p>
			<Label id="anti-hoist" title="Enable/Disable">
				<SlideToggle
					label="anti-hoist"
					name="anti-hoist"
					size="sm"
					value="true"
					bind:checked={values.antihoistEnabled}
					on:change={handleSave}
				/>
			</Label>
		</SettingsCard>

		<SettingsCard title="Report">
			<p>The channel to send message reports to.</p>
			<Label id="report-channel" title="Report channel">
				<TextChannelList id="report-channel" bind:selected={values.reportChannelId} {channels} on:change={handleSave} />
			</Label>
		</SettingsCard>
	</SettingsRow>
</div>
