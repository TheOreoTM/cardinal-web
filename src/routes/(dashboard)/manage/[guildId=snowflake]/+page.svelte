<script lang="ts">
	import Meta from '$components/Meta.svelte';
	import type { PageData } from './$types';
	import Label from '$components/forms/Label.svelte';
	import SettingsCard from '$components/dashboard/SettingsCard.svelte';
	import { getExtendedToastStore } from '$lib/utils/toast';
	import { handleGuildSave, save } from '$lib/utils/saveLogic';
	import Heading from '$components/ui/Heading.svelte';
	import SettingsRow from '$components/dashboard/SettingsRow.svelte';
	import { onMount } from 'svelte';
	import { PathNames } from '$lib/constants';
	import GlowButton from '$components/ui/GlowButton.svelte';
	import { getGuildAvatarUrl } from '$lib/utils/common';
	import { page } from '$app/stores';
	import { saving } from '$lib/stores/unsavedChanges';

	const toast = getExtendedToastStore();

	function warnPrefix() {
		toast.clear();
		toast.error('Provide a valid prefix between 1 and 10 characters');
	}

	function warnNicknameMaxLength() {
		toast.clear();
		toast.error('Nickname cant be longer than 32 characters');
	}

	async function updateNickname() {
		$saving = true;
		const nickname = data.nickname.nickname === '' ? null : data.nickname.nickname;
		const res = await fetch(`/api/nickname`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ nickname, guildId: guild.id })
		});

		const json = await res.json();

		if (json.error) {
			toast.error('Failed to update nickname, please try again later.');
		} else {
			defaults.nickname.nickname = data.nickname.nickname;
			toast.success('Nickname updated successfully');
		}

		values.nickname = data.nickname.nickname;
		$saving = false;
	}

	function isValidPrefix(prefix: string) {
		return prefix.length >= 1 && prefix.length <= 10;
	}

	function isValidNickname(nickname: string) {
		return nickname.length <= 32;
	}

	function handlePrefixInput(event: Event) {
		if (!(event.target instanceof HTMLInputElement)) return;
		let prefix = event.target.value;

		const valid = isValidPrefix(prefix);

		if (valid) {
			data.data.prefix = prefix;
		} else {
			warnPrefix();
		}
	}

	function handleNicknameInput(event: Event) {
		if (!(event.target instanceof HTMLInputElement)) return;
		let nickname = event.target.value;

		const valid = isValidNickname(nickname);

		if (nickname.length > 32) {
			nickname = nickname.slice(0, 32);

			warnNicknameMaxLength();

			data.nickname.nickname = nickname;
		}

		if (valid) {
			data.nickname.nickname = nickname;
		} else {
			warnNicknameMaxLength();
		}
	}

	export let data: PageData;

	$: guild = data.guild;
	$: guildData = data.data;

	$: defaults = {
		prefix: guildData.prefix,
		nickname: data.nickname
	};

	let values = {
		prefix: data.data.prefix,
		nickname: data.nickname.nickname
	};
</script>

<Meta
	title="Dashboard"
	blockRobots
	logo={getGuildAvatarUrl(data.guild.id, data.guild.icon)}
	guildName={data.guild.name}
/>

<div class="space-y-6">
	<Heading title="Server Info" />
	<SettingsCard title="Information">
		<div>
			<p>
				<strong>Server Name:</strong>
				{guild.name}
			</p>
			<p>
				<strong>Server ID:</strong>
				<span class="overflow-hidden overflow-ellipsis min-w-0">{guild.id}</span>
				<button
					class="hover:text-primary-500"
					title="Copy ID"
					on:click={() => {
						navigator.clipboard.writeText(guild.id);
						toast.success('Copied ID to clipboard');
					}}><i class="fa-regular fa-copy"></i></button
				>
			</p>
			<p>
				<br />
				{#if !guildData.premium}
					<a href={PathNames.Premium}>
						<span>
							<GlowButton>Get Premium</GlowButton>
						</span>
					</a>
				{:else}
					<p>
						<button disabled class="btn btn-sm variant-filled-success"> Premium is active </button>
					</p>
				{/if}
			</p>
		</div>
	</SettingsCard>
	<Heading title="Bot Settings" />
	<SettingsRow>
		<SettingsCard title="Bot Prefix">
			<p>What prefix the bot should respond to</p>
			<Label id="bot-prefix" title="Prefix">
				<div class="sm:input-group input-group-divider grid-cols-[1fr_auto]">
					<input
						class="input"
						type="text"
						placeholder={defaults.prefix}
						id="prefix"
						bind:value={data.data.prefix}
						on:input={handlePrefixInput}
						min="1"
						max="10"
						disabled={$saving}
					/>
					<button
						disabled={$saving || values.prefix === defaults.prefix}
						on:click={() => {
							if (isValidPrefix(data.data.prefix)) {
								handleGuildSave(data.guild.id, { prefix: data.data.prefix }, toast);
								values.prefix = data.data.prefix;
							}
						}}
						class="btn variant-filled-primary w-full">Update</button
					>
				</div>
			</Label>
		</SettingsCard>
		<SettingsCard title="Bot Nickname">
			<p>Change the nickname of the bot</p>
			<Label id="bot-nickname" title="Nickname">
				<div class="sm:input-group input-group-divider grid-cols-[1fr_auto]">
					<input
						class="input"
						type="text"
						placeholder={data.nickname.nickname ?? 'Cardinal'}
						on:input={handleNicknameInput}
						id="nickname"
						min="1"
						max="32"
						bind:value={data.nickname.nickname}
						disabled={$saving}
					/>
					<button
						disabled={values.nickname === defaults.nickname.nickname}
						on:click={updateNickname}
						class="btn variant-filled-primary w-full"
					>
						Set Nickname
					</button>
				</div>
			</Label>
		</SettingsCard>
	</SettingsRow>
</div>
