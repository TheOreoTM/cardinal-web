<script lang="ts">
	import Meta from '$components/Meta.svelte';
	import type { PageData } from './$types';
	import Label from '$components/forms/Label.svelte';
	import SettingsCard from '$components/dashboard/SettingsCard.svelte';
	import { getExtendedToastStore } from '$lib/utils/toast';
	import Heading from '$components/ui/Heading.svelte';
	import { getGuildAvatarUrl } from '$lib/utils/common';
	import SelectOneChannel from '$components/dashboard/SelectOneChannel.svelte';
	import EmojiPicker from '$components/dashboard/EmojiPicker.svelte';
	import { handleGuildSave } from '$lib/utils/saveLogic';
	import { saving } from '$lib/stores/unsavedChanges';

	export let data: PageData;

	const guild = data.guild;
	const guildData = data.data;

	let defaults = {
		channel: guildData.starboardChannel,
		threshhold: guildData.starboardThreshold,
		reaction: guildData.starboardReaction
	};

	let values = {
		...defaults
	};

	function handleThresholdInput(event: Event) {
		if (!(event.target instanceof HTMLInputElement)) return;
		let value = parseInt(event.target.value, 10);
		values.threshhold = value;
	}

	function isValidThreshold(value: number) {
		return value >= 1 && value <= 30;
	}

	const toast = getExtendedToastStore();

	function warnThreshold() {
		toast.clear();
		toast.error('Threshold must be between 1 and 30');
	}

	function handleSave(setting: { [key: string]: any }) {
		handleGuildSave(guild.id, setting, toast);
	}
</script>

<Meta
	title="Starboard Settings"
	blockRobots
	logo={getGuildAvatarUrl(data.guild.id, data.guild.icon)}
	guildName={data.guild.name}
/>

<Heading title="Starboard" description={`Manage the starboard settings for ${data.guild.name}`} />
<div class="space-y-6">
	<SettingsCard title="Starboard Channel">
		<p>
			The channel where the messages that hit the star count ({guildData.starboardThreshold} stars) should be sent
			to.
		</p>
		<div
			class="grid grid-flow-row space-y-2 sm:space-y-0 sm:grid-flow-col sm:space-x-6 sm:grid-cols-2 justify-self-auto"
		>
			<div>
				<Label title="Channel" id="channel-starboard">
					<SelectOneChannel
						bind:selected={values.channel}
						channels={data.channels}
						onSelected={() => handleSave({ starboardChannel: values.channel })}
					/>
				</Label>
			</div>

			<div>
				<Label title="Threshold" id="threshold">
					<div class="input-group input-group-divider grid-cols-[1fr_auto]">
						<input
							class="input"
							type="number"
							placeholder="Amount..."
							id="threshold"
							disabled={$saving}
							bind:value={values.threshhold}
							on:input={handleThresholdInput}
							min="1"
							max="30"
						/>
						<button
							class="btn variant-filled"
							disabled={values.threshhold === defaults.threshhold}
							on:click={() => {
								if (isValidThreshold(values.threshhold)) {
									handleSave({ starboardThreshold: values.threshhold });
									defaults.threshhold = values.threshhold;
								} else {
									warnThreshold();
								}
							}}
						>
							Save
						</button>
					</div>
				</Label>
			</div>

			<div>
				<Label title="Emoji" id="thread">
					<EmojiPicker
						bind:selected={values.reaction}
						onSelected={() => handleSave({ starboardReaction: values.reaction })}
					/>
				</Label>
			</div>
		</div>
	</SettingsCard>
</div>
