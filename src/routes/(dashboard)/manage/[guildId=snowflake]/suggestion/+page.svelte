<script lang="ts">
	import Meta from '$components/Meta.svelte';
	import type { PageData } from './$types';
	import Label from '$components/forms/Label.svelte';
	import SettingsCard from '$components/dashboard/SettingsCard.svelte';
	import { getExtendedToastStore } from '$lib/utils/toast';
	import Heading from '$components/ui/Heading.svelte';
	import { getGuildAvatarUrl } from '$lib/utils/common';
	import { save } from '$lib/utils/saveLogic';
	import SettingsRow from '$components/dashboard/SettingsRow.svelte';
	import SelectOneChannel from '$components/dashboard/SelectOneChannel.svelte';
	import { SlideToggle } from '@skeletonlabs/skeleton';

	const toast = getExtendedToastStore();

	function saveSuccessful() {
		toast.clear();
		toast.success('Saved settings successfully');
	}

	function saveFailed() {
		toast.clear();
		toast.error('Failed to save settings');
	}

	async function handleSave(setting: { [key: string]: any }) {
		loading = true;
		await save(guild.id, 'moderation', setting, saveSuccessful, saveFailed);
		loading = false;
	}

	let loading = false;

	export let data: PageData;

	const guild = data.guild;
	const guildData = data.data;

	let defaults = {
		channel: guildData.channelSuggestion,
		createThread: guildData.suggestionCreateThread ?? false
	};

	let values = {
		...defaults
	};

	console.log(values);

	// For new system for suggestion feedback
	let action: string = values.createThread ? 'thread' : 'none';

	function selectChip(c: string): void {
		action = c;
	}
</script>

<Meta
	title="Suggestion Settings"
	blockRobots
	logo={getGuildAvatarUrl(data.guild.id, data.guild.icon)}
	guildName={data.guild.name}
/>

<Heading
	title="Suggestion"
	description={`Manage the suggestion settings for ${data.guild.name}`}
/>
<div class="space-y-6">
	<SettingsCard title="Suggestion Channel">
		<p>
			The channel where the bot should send the suggestion to send when a member
			makes a suggestion.
		</p>
		<Label title="Channel" id="channel-suggestion">
			<SelectOneChannel
				selected={values.channel}
				channels={data.channels}
				disabled={loading}
				onSelected={() => handleSave({ channelSuggestion: values.channel })}
			/>
		</Label>
	</SettingsCard>
	<SettingsRow>
		<SettingsCard title="Create Thread">
			<p>
				Should the bot create a thread under every suggestion so that members
				can discuss in it.
			</p>
			<Label title="Create Thread" id="thread">
				<SlideToggle
					on:change={async () => {
						await handleSave({
							suggestionCreateThread: values.createThread
						});
					}}
					disabled={loading}
					size="sm"
					name="thread"
					bind:checked={values.createThread}
				/>
			</Label>
		</SettingsCard>
		<!-- Disabled For Now -->
		<div class="opacity-60 hover:cursor-not-allowed">
			<SettingsCard title="Suggestion Feedback Type" badgeText="Coming Soon">
				<p>The system you want for suggestion feedback.</p>
				<Label title="Type" id="type">
					<div class="flex flex-row space-x-2">
						{#each ['thread', 'vote', 'none'] as a}
							<button
								disabled
								class="chip capitalize {action === a
									? 'variant-filled-primary'
									: 'variant-soft-primary'}"
								on:click={() => {
									selectChip(a);
								}}
								on:keypress
							>
								<span>{a}</span>
							</button>
						{/each}
					</div>
				</Label>
			</SettingsCard>
		</div>
	</SettingsRow>
</div>
