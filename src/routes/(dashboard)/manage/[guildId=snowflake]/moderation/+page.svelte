<script lang="ts">
	import Meta from '$components/Meta.svelte';
	import type { PageData } from './$types';
	import Label from '$components/forms/Label.svelte';
	import SettingsCard from '$components/dashboard/SettingsCard.svelte';
	import { getExtendedToastStore } from '$lib/utils/toast';
	import Heading from '$components/ui/Heading.svelte';
	import { getGuildAvatarUrl } from '$lib/utils/common';
	import SelectOneRole from '$components/dashboard/SelectOneRole.svelte';
	import { save } from '$lib/utils/saveLogic';
	import SettingsRow from '$components/dashboard/SettingsRow.svelte';

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
		save(guild.id, 'moderation', setting, saveSuccessful, saveFailed);
	}

	export let data: PageData;

	const guild = data.guild;
	const guildData = data.data;

	let defaults = {
		admin: guildData.roleAdmin ?? '',
		moderator: guildData.roleModerator ?? '',
		staff: guildData.roleStaff ?? '',
		trainee: guildData.roleTrainee ?? '',
		muted: guildData.roleMuted ?? '',
		link: guildData.appealLink ?? ''
	};

	let values = {
		...defaults
	};
</script>

<Meta
	title="Moderation Settings"
	logo={getGuildAvatarUrl(data.guild.id, data.guild.icon)}
	guildName={data.guild.name}
/>

<Heading
	title="Moderation"
	description={`Manage the moderation settings for ${data.guild.name}`}
/>
<div class="space-y-6">
	<SettingsCard title="Moderator Roles">
		<p>
			As of now, cardinal gives you the the option to setup roles for each staff
			position. This may or not may not be changed soon.
		</p>
		<Label title="Admin role" id="role-admin">
			<SelectOneRole
				onSelected={() => handleSave({ roleAdmin: values.admin })}
				roles={data.roles}
				bind:selected={values.admin}
			/>
		</Label>
		<Label title="Moderator role" id="role-moderator">
			<SelectOneRole
				onSelected={() => handleSave({ roleModerator: values.moderator })}
				roles={data.roles}
				bind:selected={values.moderator}
			/>
		</Label>
		<Label title="Staff role" id="role-staff">
			<SelectOneRole
				onSelected={() => handleSave({ roleStaff: values.staff })}
				roles={data.roles}
				bind:selected={values.staff}
			/>
		</Label>
		<Label title="Trainee role" id="role-trainee">
			<SelectOneRole
				onSelected={() => handleSave({ roleTrainee: values.trainee })}
				roles={data.roles}
				bind:selected={values.trainee}
			/>
		</Label>
	</SettingsCard>
	<SettingsRow>
		<SettingsCard title="Muted Role">
			<p>The role cardinal will give members when they get muted</p>

			<Label title="Muted role" id="role-muted">
				<SelectOneRole
					onSelected={() => handleSave({ roleMuted: values.trainee })}
					roles={data.roles}
					bind:selected={values.muted}
				/>
			</Label>
		</SettingsCard>
		<SettingsCard title="Appeal Link">
			<p>
				The link to send members when they get muted/banned. Inbuilt appeals may
				be coming to cardinal in the future
			</p>

			<Label title="Link" id="appeal-link">
				<div class="sm:input-group input-group-divider grid-cols-[1fr_auto]">
					<input
						class="input"
						type="text"
						placeholder="Amount..."
						id="stats-lookback"
						bind:value={values.link}
						min="1"
						max="30"
					/>
					<button
						disabled={values.link === defaults.link}
						on:click={() => {
							handleSave({ appealLink: values.link });
							defaults.link = values.link;
						}}
						class="btn variant-filled-primary w-full">Update</button
					>
				</div>
			</Label>
		</SettingsCard>
	</SettingsRow>
</div>
