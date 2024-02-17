<script lang="ts">
	import Meta from '$components/Meta.svelte';
	import Heading from '$components/ui/Heading.svelte';
	import { getGuildAvatarUrl } from '$lib/utils/common';
	import { Step, Stepper } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { getExtendedToastStore } from '$lib/utils/toast';
	import SelectOneRole from '$components/dashboard/SelectOneRole.svelte';
	import { save } from '$lib/utils/saveLogic';
	import { loading } from '$lib/stores/loading';
	import { confetti } from '$lib/stores/confetti';
	import { goto } from '$app/navigation';
	import ConfettiRain from '$components/ui/ConfettiRain.svelte';
	import { redirect } from '@sveltejs/kit';
	import { browser } from '$app/environment';

	export let data: PageData;

	async function onCompleteHandler() {
		const settings = Object.keys(values) as (keyof typeof values)[];

		$loading = true;
		for (const setting of settings) {
			const value = values[setting];
			await handleSave(setting, value);
		}
		$loading = false;

		if (browser) {
			window.location.href = `/manage/${data.guild.id}?message=${encodeURIComponent('This server has been setup successfully')}`;
		}
	}

	function saveSuccessful(setting: string, value: string) {
		console.log(`Saved ${setting} with value ${value}`);
	}

	function saveFailed(setting: string) {
		toast.error(`Failed to save setting ${setting}`);
	}

	async function handleSave(setting: string, value: any) {
		await save(
			data.guild.id,
			'bot',
			{ [setting]: value },
			() => saveSuccessful(setting, value),
			() => saveFailed(setting)
		);
	}

	const toast = getExtendedToastStore();

	function warnPrefix() {
		toast.clear();
		toast.error('Provide a valid prefix between 1 and 10 characters');
	}

	function isValidPrefix(prefix: string) {
		return prefix.length >= 1 && prefix.length <= 10;
	}

	function handlePrefixInput(event: Event) {
		if (!(event.target instanceof HTMLInputElement)) return;
		let prefix = event.target.value;

		const valid = isValidPrefix(prefix);

		if (valid) {
			values.prefix = prefix;
		} else {
			values.prefix = values.prefix.slice(0, 10);
			warnPrefix();
		}
	}

	let values = {
		prefix: data.data?.prefix ?? '>',
		lookback: data.data?.lookback ?? 7,
		roleTrainee: data.data?.roleTrainee ?? '',
		roleStaff: data.data?.roleStaff ?? '',
		roleModerator: data.data?.roleModerator ?? '',
		roleAdmin: data.data?.roleAdmin ?? '',
		roleMuted: data.data?.roleMuted ?? ''
	};
</script>

<Meta
	title="Setup Guild"
	logo={getGuildAvatarUrl(data.guild.id, data.guild.icon)}
	guildName={data.guild.name}
/>

<Heading title={`Lets get ${data.guild.name} up and running`} centered />

<div class="w-full card p-4 text-token">
	<Stepper
		on:complete={async () => {
			onCompleteHandler();
		}}
	>
		<!-- <Step>
			<svelte:fragment slot="header">Get Started!</svelte:fragment>
			<p>
				Lets help you setup the basic setting for <span class="font-bold">{data.guild.name}</span>
			</p>
			<svelte:fragment slot="navigation"
				><button on:click={() => {}} class="btn variant-ghost">Skip</button></svelte:fragment
			>
		</Step> -->
		<Step>
			<svelte:fragment slot="header">Prefix</svelte:fragment>
			<p>What prefix should the bot respond to?</p>
			<input
				class="input"
				type="text"
				placeholder=">"
				id="prefix"
				bind:value={values.prefix}
				on:input={handlePrefixInput}
				min="1"
				max="10"
			/>
			<svelte:fragment slot="navigation"
				><button on:click={() => {}} class="btn variant-ghost">Skip</button></svelte:fragment
			>
		</Step>
		<Step>
			<svelte:fragment slot="header">Admin Role</svelte:fragment>
			<p>What role should cardinal consider as the admin role?</p>
			<SelectOneRole roles={data.roles} bind:selected={values.roleAdmin} />
		</Step>
		<Step>
			<svelte:fragment slot="header">Moderator Role</svelte:fragment>
			<p>What role should cardinal consider as the moderator role?</p>
			<SelectOneRole roles={data.roles} bind:selected={values.roleModerator} />
		</Step>
		<Step>
			<svelte:fragment slot="header">Staff Role</svelte:fragment>
			<p>What role should cardinal consider as the staff role?</p>
			<SelectOneRole roles={data.roles} bind:selected={values.roleStaff} />
		</Step>
		<Step>
			<svelte:fragment slot="header">Trainee Role</svelte:fragment>
			<p>What role should cardinal consider as the trainee role?</p>
			<SelectOneRole roles={data.roles} bind:selected={values.roleTrainee} />
		</Step>
		<Step>
			<svelte:fragment slot="header">Muted Role</svelte:fragment>
			<p>What role should cardinal assign muted members?</p>
			<SelectOneRole roles={data.roles} bind:selected={values.roleMuted} />
		</Step>
	</Stepper>
</div>
