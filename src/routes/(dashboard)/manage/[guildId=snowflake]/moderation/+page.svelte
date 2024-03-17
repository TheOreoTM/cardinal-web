<script lang="ts">
	import Meta from '$components/Meta.svelte';
	import type { PageData } from './$types';
	import Label from '$components/forms/Label.svelte';
	import SettingsCard from '$components/dashboard/SettingsCard.svelte';
	import { getExtendedToastStore } from '$lib/utils/toast';
	import Heading from '$components/ui/Heading.svelte';
	import { getGuildAvatarUrl } from '$lib/utils/common';
	import SelectOneRole from '$components/dashboard/SelectOneRole.svelte';
	import { handleGuildSave, save } from '$lib/utils/saveLogic';
	import SettingsRow from '$components/dashboard/SettingsRow.svelte';
	import SelectOneChannel from '$components/dashboard/SelectOneChannel.svelte';
	import SingleChipSelect from '$components/dashboard/SingleChipSelect.svelte';
	import type { SelectOption } from '$lib/types';
	import { saving } from '$lib/stores/unsavedChanges';

	export let data: PageData;

	const guild = data.guild;
	const guildData = data.data;

	const toast = getExtendedToastStore();

	let defaults = {
		admin: guildData.roleAdmin ?? '',
		moderator: guildData.roleModerator ?? '',
		staff: guildData.roleStaff ?? '',
		trainee: guildData.roleTrainee ?? '',
		muted: guildData.roleMuted ?? '',
		link: guildData.appealLink ?? '',
		channelAppeal: guildData.channelAppeal ?? '',
		appealType: guildData.appealType ?? 'disabled'
	};

	let values = {
		...defaults
	};

	const appealOptions: SelectOption[] = [
		{ label: 'Built-in', value: 'builtin' },
		{ label: 'External', value: 'external' },
		{ label: 'Disabled', value: 'disabled' }
	];
</script>

<Meta
	title="Moderation Settings"
	logo={getGuildAvatarUrl(data.guild.id, data.guild.icon)}
	guildName={data.guild.name}
/>

<Heading title="Moderation" description={`Manage the moderation settings for ${data.guild.name}`} />
<div class="space-y-6">
	<SettingsCard title="Moderator Roles">
		<p>
			As of now, cardinal gives you the the option to setup roles for each staff position. This may or not may
			not be changed soon.
		</p>
		<Label title="Admin role" id="role-admin">
			<SelectOneRole
				onSelected={() => handleGuildSave(guild.id, { roleAdmin: values.admin }, toast)}
				roles={data.roles}
				bind:selected={values.admin}
			/>
		</Label>
		<Label title="Moderator role" id="role-moderator">
			<SelectOneRole
				onSelected={() => handleGuildSave(guild.id, { roleModerator: values.moderator }, toast)}
				roles={data.roles}
				bind:selected={values.moderator}
			/>
		</Label>
		<Label title="Staff role" id="role-staff">
			<SelectOneRole
				onSelected={() => handleGuildSave(guild.id, { roleStaff: values.staff }, toast)}
				roles={data.roles}
				bind:selected={values.staff}
			/>
		</Label>
		<Label title="Trainee role" id="role-trainee">
			<SelectOneRole
				onSelected={() => handleGuildSave(guild.id, { roleTrainee: values.trainee }, toast)}
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
					onSelected={() => handleGuildSave(guild.id, { roleMuted: values.muted }, toast)}
					roles={data.roles}
					bind:selected={values.muted}
				/>
			</Label>
		</SettingsCard>
	</SettingsRow>

	<Heading title="Appeals" description="Settings relevent to appeals in cardinal bot" />
	<SettingsRow>
		<SettingsCard title="Appeal Type">
			<p>The type of appeals cardinal should use</p>

			<footer>
				<SingleChipSelect
					onSelect={() => handleGuildSave(guild.id, { appealType: values.appealType }, toast)}
					bind:selected={values.appealType}
					options={appealOptions}
				/>
			</footer>
		</SettingsCard>
		<!-- Inbuilt Appeals -->
		<div hidden={values.appealType !== 'builtin'}>
			<SettingsCard title="Appeal Channel">
				<p>The channel user appeals will be sent to</p>

				<Label title="Channel" id="appeal-channel">
					<SelectOneChannel
						channels={data.channels}
						bind:selected={values.channelAppeal}
						onSelected={() => handleGuildSave(guild.id, { channelAppeal: values.channelAppeal }, toast)}
					/>
				</Label>
			</SettingsCard>
		</div>

		<!-- External Appeals -->
		<div hidden={values.appealType !== 'external'}>
			<SettingsCard title="Appeal Link">
				<p>
					The link to send members when they get muted/banned. Inbuilt appeals may be coming to cardinal in
					the future
				</p>

				<Label title="Link" id="appeal-link">
					<div class="sm:input-group input-group-divider grid-cols-[1fr_auto]">
						<input
							class="input"
							type="text"
							disabled={$saving}
							placeholder="https://..."
							id="stats-lookback"
							bind:value={values.link}
							min="1"
							max="30"
						/>
						<button
							disabled={values.link === defaults.link}
							on:click={() => {
								handleGuildSave(guild.id, { appealLink: values.link }, toast);
								defaults.link = values.link;
							}}
							class="btn variant-filled-primary w-full">Update</button
						>
					</div>
				</Label>
			</SettingsCard>
		</div>
	</SettingsRow>
</div>
