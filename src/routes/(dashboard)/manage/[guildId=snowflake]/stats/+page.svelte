<script lang="ts">
	import Meta from '$components/Meta.svelte';
	import type { PageData } from './$types';
	import Label from '$components/forms/Label.svelte';
	import SettingsCard from '$components/dashboard/SettingsCard.svelte';
	import { getExtendedToastStore } from '$lib/utils/toast';
	import { save } from '$lib/utils/saveLogic';
	import Heading from '$components/ui/Heading.svelte';
	import { getGuildAvatarUrl } from '$lib/utils/common';
	import { saving } from '$lib/stores/unsavedChanges';

	const toast = getExtendedToastStore();

	function saveSuccessful() {
		toast.clear();
		toast.success('Saved settings successfully');
	}

	function saveFailed() {
		toast.clear();
		toast.error('Failed to save settings');
	}

	function warnPremium() {
		toast.clear();
		toast.warning('You need premium to set the lookback amount higher than 30 days.');
	}

	function warnRange() {
		toast.clear();
		toast.error('Lookback amount must be between 1 and 30');
	}

	function warnNumber() {
		toast.clear();
		toast.error('Lookback amount must be a number');
	}

	function handleSave(setting: { [key: string]: any }) {
		save(guild.id, 'stats', setting, saveSuccessful, saveFailed);
	}

	function isValidlookback(value: number) {
		return value >= 1 && value <= maxValue;
	}

	function handleLookbackInput(event: Event) {
		if (!(event.target instanceof HTMLInputElement)) return;
		let value = parseInt(event.target.value, 10);

		const valid = isValidlookback(value);

		// Ensure the value is within the range 1 to 30
		if (valid) {
			values.lookback = value;
		} else {
			toast.clear();
			// If outside the range, set it to the nearest limit
			// values.lookback = Math.min(Math.max(value, 1), maxValue);
			if (isNaN(value)) {
				warnNumber();
				return;
			}
			if (value > 30 && !guildData.premium) {
				values.lookback = 30;
				warnPremium();
			} else {
				values.lookback = 1;
				warnRange();
			}
		}
	}

	export let data: PageData;

	const guild = data.guild;
	const guildData = data.data;
	const maxValue = guildData.premium ? 365 : 30;

	let defaults = {
		lookback: guildData.lookback
	};

	let values = {
		...defaults
	};
</script>

<Meta
	title="Stats Settings"
	logo={getGuildAvatarUrl(data.guild.id, data.guild.icon)}
	guildName={data.guild.name}
/>

<Heading
	title="Stats Tracking"
	description="Manage the lookback amount for the server and view basic server stats"
/>
<div class="space-y-6">
	<SettingsCard title="Lookback" documentation="The historic lookback for stats commands">
		<p>How much days should the bot take into consideration when displaying stats (higher = slower)</p>
		<Label id="stats-lookback" title="Lookback Amount">
			<div class="sm:input-group input-group-divider grid-cols-[1fr_auto]">
				<input
					class="input"
					type="number"
					placeholder="Amount..."
					id="stats-lookback"
					disabled={$saving}
					bind:value={values.lookback}
					on:input={handleLookbackInput}
					min="1"
					max="30"
				/>
				<button
					disabled={values.lookback === defaults.lookback}
					on:click={() => {
						if (isValidlookback(values.lookback)) {
							handleSave({ lookback: values.lookback });
							defaults.lookback = values.lookback;
						} else {
							if (!guildData.premium && values.lookback > 30) {
								warnPremium();
							} else {
								warnRange();
							}
						}
					}}
					class="btn variant-filled-primary w-full">Update</button
				>
			</div>
		</Label>
	</SettingsCard>
</div>
