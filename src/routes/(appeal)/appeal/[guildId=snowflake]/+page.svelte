<script lang="ts">
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';
	import Label from '$components/forms/Label.svelte';
	import Heading from '$components/ui/Heading.svelte';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { getGuildAvatarUrl } from '$lib/utils/common';

	export let data: PageData;

	const guildData = data.data;
	const guild = data.guild;
	const { form, errors, enhance } = superForm(data.form);
</script>

<!-- <SuperDebug data={$form} /> -->

{#if data.eligible}
	{#if guildData.appealType === 'external'}
		{#if guildData.appealLink !== ''}
			This server is only accepting external appeals via <a class="anchor" href={guildData.appealLink}
				>{guildData.appealLink}</a
			>
		{:else}
			This server doesn't accept built-in appeals
		{/if}
	{/if}

	{#if guildData.appealType === 'builtin'}
		<article>
			<div class="flex flex-row space-x-6">
				<span
					><Avatar class="hidden md:block" width="w-16" src={getGuildAvatarUrl(guild.id, guild.icon)} /></span
				>
				<Heading title="New Appeal for {guild.name}" />
			</div>

			<form class="flex flex-col space-y-6" method="POST" use:enhance>
				<Label id="type" title="1. What type of action are you appealing?">
					<div class="space-y-2">
						<label class="flex items-center space-x-2">
							<input class="radio" type="radio" name="type" value="mute" required bind:group={$form.type} />
							<p>Mute</p>
						</label>
						<label class="flex items-center space-x-2">
							<input class="radio" type="radio" name="type" value="ban" bind:group={$form.type} />
							<p>Ban</p>
						</label>
					</div>
					{#if $errors.type}
						<small class="">{$errors.type}</small>
					{/if}
				</Label>
				<Label id="reason" title="2. Why were you moderated?">
					<textarea
						required
						class="textarea min-h-28"
						rows="4"
						id="reason"
						name="reason"
						placeholder="Answer here..."
						bind:value={$form.reason}
					/>
				</Label>
				{#if $errors.reason}
					<small>{$errors.reason}</small>
				{/if}
				<Label id="appeal" title="3. What is your appeal?">
					<textarea
						required
						class="textarea min-h-28"
						rows="4"
						id="appeal"
						name="appeal"
						placeholder="Answer here..."
						bind:value={$form.appeal}
					/>
				</Label>
				{#if $errors.appeal}
					<small>{$errors.appeal}</small>
				{/if}
				<Label id="extra" title="4. Anything else you would like to add?">
					<textarea
						required
						class="textarea min-h-28"
						rows="4"
						id="extra"
						name="extra"
						placeholder="Answer here..."
						bind:value={$form.extra}
					/>
				</Label>
				{#if $errors.extra}
					<small>{$errors.extra}</small>
				{/if}
				<button class="btn max-w-24 variant-filled" type="submit">Submit</button>
			</form>
		</article>
	{/if}

	{#if guildData.appealType === 'disabled'}
		Appeals are disabled on this server
	{/if}
{:else}
	Hey hey, calm down you already appealed less than 24 hours ago
{/if}
