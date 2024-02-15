<script lang="ts">
	import Meta from '$components/Meta.svelte';
	import GlowButton from '$components/ui/GlowButton.svelte';
	import ZPattern from '$components/ui/ZPattern.svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import Typewriter from 'svelte-typewriter';
	import { onMount } from 'svelte';
	import { PathNames } from '$lib/constants.js';

	export let data;

	const features = [
		'Giveaways',
		'AFK handling',
		'Automod',
		'Moderation',
		'Suggestions',
		'Stats Tracking',
		'Server Management'
	];

	onMount(() => {
		if (data.error) {
			toastStore.trigger({
				message: 'Failed to log in. Please try again.',
				hideDismiss: true,
				timeout: 8000,
				background: 'variant-filled-warning'
			});
			toastStore.trigger({
				message: `Error: ${data.error}`,
				hideDismiss: true,
				timeout: 8000,
				background: 'variant-filled-warning'
			});
		}

		if (data.message) {
			toastStore.trigger({
				message: data.message,
				timeout: 8000,
				background: 'variant-filled-primary'
			});
		}
	});

	const toastStore = getToastStore();
</script>

<Meta title="Home" />

<div class="flex flex-col items-center space-y-10">
	<div>
		<h1 class="h1 text-5xl uppercase font-extrabold font-sans text-center">
			<span class="gradient-header">Cardinal Bot</span>
		</h1>
		<hr class="opacity-60 !mb-10 !mt-2 mx-auto w-[40%]" />
		<div class="text-center text-lg">
			Your go-to Discord bot for <br />
			<div class="items-center min-h-10">
				<Typewriter
					mode="loop"
					interval={60}
					unwriteInterval={50}
					wordInterval={2000}
					cursor={false}
				>
					{#each features as word}
						<span class="highlight text-3xl font-bold">{word}</span>
					{/each}
				</Typewriter>
			</div>
			Elevate your server experience effortlessly!
		</div>
	</div>

	<div class="flex flex-row pt-4">
		<GlowButton href={PathNames.Invite} size="btn-xl"
			>Invite to Server</GlowButton
		>
		<div class="hidden sm:block">
			<!-- <GlowButton
				size="btn-xl"
				bgColor="bg-primary-500"
				shadowColor="shadow-primary-500">Dashboard</GlowButton
			> -->
		</div>
	</div>
</div>
<div class="flex flex-col my-20 gap-y-0">
	<ZPattern isOdd>
		<svelte:fragment slot="header">
			<span class="highlight font-bold">Track</span> Stats Easily
		</svelte:fragment>
		<svelte:fragment slot="body">
			Cardinal can track the number of messages sent for a user, role, or in a
			channel and display detailed statistics. Users have the flexibility to
			customize the time range for these stats, offering a tailored analysis of
			message activity within the specified period.
		</svelte:fragment>
		<svelte:fragment slot="preview">
			<img
				src="/images/preview/cardinal-stats.png"
				width="1000"
				height="1000"
				alt=""
				class="order-1 md:order-2 md:ml-auto"
			/>
		</svelte:fragment>
	</ZPattern>

	<ZPattern>
		<svelte:fragment slot="header">
			<span class="highlight font-bold">Moderate</span> Members Conveniently
		</svelte:fragment>
		<svelte:fragment slot="body">
			Cardinal offers all the standard moderation commands you expect, like
			banning, muting, kicking and more. However, it also includes unique
			features such as being able to look at the actions a certain staff member
			has taken on any member. For a full list of moderation commands, visit the
			commands page.
		</svelte:fragment>
		<svelte:fragment slot="preview">
			<img
				src="/images/preview/cardinal-mute.png"
				width="1000"
				height="1000"
				alt=""
				class="md:ml-auto"
			/>
		</svelte:fragment>
	</ZPattern>

	<ZPattern isOdd>
		<svelte:fragment slot="header">
			<span class="highlight font-bold">Flexible</span> Configuration
		</svelte:fragment>
		<svelte:fragment slot="body">
			The flexible restriction module can allow admins to limit the usability of
			a command to a certain role, channel or even a certain member. This
			ensures that cardinal is setup just the way you want in your server.
		</svelte:fragment>
		<svelte:fragment slot="preview">
			<img
				src="/images/preview/cardinal-config.png"
				width="1000"
				height="1000"
				alt=""
				class="md:ml-auto"
			/>
		</svelte:fragment>
	</ZPattern>

	<ZPattern>
		<svelte:fragment slot="header">
			Host <span class="highlight font-bold">Giveaways</span>
		</svelte:fragment>
		<svelte:fragment slot="body">
			Organize exciting giveaways for your community with Cardinal. Engage your
			members and reward them for their participation. Customize giveaway
			settings, choose winners fairly, and bring fun to your server events.
		</svelte:fragment>
		<svelte:fragment slot="preview">
			<img
				src="/images/preview/cardinal-giveaway.png"
				width="1000"
				height="1000"
				alt=""
				class="md:ml-auto"
			/>
		</svelte:fragment>
	</ZPattern>
</div>

<div class="text-center text-2xl space-y-8">
	<p>
		Currently serving <span class="font-black highlight"
			>{data.stats.memberAmount}</span
		>
		members in
		<span class="font-black highlight">{data.stats.guildAmount}</span>
		servers
	</p>
	<GlowButton href={PathNames.Invite} size="btn-xl"
		>Invite Cardinal To Yours</GlowButton
	>
</div>

<style lang="postcss">
	.highlight {
		@apply bg-gradient-to-br from-cyan-500 via-cyan-400 to-yellow-300 bg-clip-text text-transparent box-decoration-clone;
	}

	.gradient-header {
		@apply bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone;
	}
</style>
