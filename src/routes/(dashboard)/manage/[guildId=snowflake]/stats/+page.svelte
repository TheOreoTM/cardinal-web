<script lang="ts">
	import Meta from '$components/Meta.svelte';
	import type { PageData } from './$types';
	import Label from '$components/forms/Label.svelte';
	import SettingsCard from '$components/dashboard/SettingsCard.svelte';
	import { getExtendedToastStore } from '$lib/utils/toast';
	import { save } from '$lib/utils/saveLogic';
	import Heading from '$components/ui/Heading.svelte';

	const toast = getExtendedToastStore();

	function saveSuccessful() {
		toast.clear();
		toast.success('Saved settings successfully');
	}

	function saveFailed() {
		toast.clear();
		toast.error('Failed to save settings');
	}

	function handleSave(setting: { [key: string]: any }) {
		save(guild.id, 'stats', setting, saveSuccessful, saveFailed);
	}

	function isValidlookback(value: number) {
		if (guildData.premium) {
			return value >= 1 && value <= 365;
		} else if (!guildData.premium) {
			return value >= 1 && value <= 30;
		}
	}

	function handleLookbackInput(event: Event) {
		if (!(event.target instanceof HTMLInputElement)) return;
		let value = parseInt(event.target.value, 10);
		const maxValue = guildData.premium ? 365 : 30;

		const valid = isValidlookback(value);

		// Ensure the value is within the range 1 to 30
		if (valid) {
			values.lookback = value;
		} else {
			toast.clear();
			// If outside the range, set it to the nearest limit
			// values.lookback = Math.min(Math.max(value, 1), maxValue);
			if (isNaN(value)) {
				toast.error('Lookback amount must be a number');
				return;
			}
			if (value > 30 && !guildData.premium) {
				toast.warning(
					'You need premium to set the lookback amount higher than 30 days.'
				);
			} else {
				toast.error(`Lookback amount must be between 1 and ${maxValue}`);
			}
		}
	}

	export let data: PageData;

	const guild = data.guild;
	const guildData = data.data;

	let defaults = {
		lookback: guildData.lookback
	};

	let values = {
		...defaults
	};
</script>

<Meta title="Stats" guildName={data.guild.name} />

<Heading
	title="Stats Tracking"
	description="Manage the lookback amount for the server and view basic server stats"
/>
<div class="space-y-6">
	<SettingsCard title="Lookback" documentation={true}>
		<p>
			How much days should the bot take into consideration when displaying stats
			(higher = slower)
		</p>
		<Label id="stats-lookback" title="Lookback Amount">
			<div class="input-group input-group-divider grid-cols-[1fr_auto]">
				<input
					type="text"
					placeholder="Amount..."
					id="stats-lookback"
					bind:value={values.lookback}
					on:input={handleLookbackInput}
					min="1"
					max="30"
				/>
				<button
					on:click={() => {
						if (isValidlookback(values.lookback)) {
							handleSave({ lookback: values.lookback });
						} else {
							toast.error('Lookback amount must be between 1 and 30');
						}
					}}
					class="btn variant-filled-primary">Update</button
				>
			</div>
		</Label>
	</SettingsCard>
</div>
