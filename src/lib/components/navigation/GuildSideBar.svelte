<script lang="ts">
	import { page } from '$app/stores';
	import { PathNames } from '$lib/constants';
	import { getGuildAvatarUrl } from '$lib/utils/common';
	import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
	import type { APIGuild } from 'discord-api-types/v10';

	$: currentPath = $page.url.pathname;

	function pathName(path: string) {
		return `${PathNames.Manage}/${guildId}/${path}`;
	}

	const guildId = $page.params.guildId;
	const guild = $page.data.guild as APIGuild;

	const guildAvatar = getGuildAvatarUrl(guildId, guild.icon);
	const guildName = guild.name;
</script>

<AppRail>
	<svelte:fragment slot="lead">
		<AppRailAnchor href={PathNames.Manage}>
			<svelte:fragment slot="lead"><i class="fa-solid fa-home text-2xl" /></svelte:fragment>
			<span>Home</span>
		</AppRailAnchor>
	</svelte:fragment>
	<!-- --- -->
	<AppRailAnchor
		data-sveltekit-preload-data="hover"
		href={pathName('moderation')}
		selected={currentPath === pathName('moderation')}
		name="tile-1"
		value={0}
		title="tile-1"
	>
		<svelte:fragment slot="lead"><i class="fa-solid fa-gavel text-2xl" /></svelte:fragment>
		<span>Moderation</span>
	</AppRailAnchor>
	<AppRailAnchor
		data-sveltekit-preload-data="hover"
		href={pathName('stats')}
		selected={currentPath === pathName('stats')}
		name="tile-2"
		value={1}
		title="tile-2"
	>
		<svelte:fragment slot="lead"><i class="fa-solid fa-trophy text-2xl" /></svelte:fragment>
		<span>Stats</span>
	</AppRailAnchor>
	<AppRailAnchor
		data-sveltekit-preload-data="hover"
		href={pathName('logging')}
		selected={currentPath === pathName('logging')}
		name="tile-3"
		value={2}
		title="tile-3"
	>
		<svelte:fragment slot="lead"><i class="fa-regular fa-clipboard text-2xl" /></svelte:fragment>
		<span>Logging</span>
	</AppRailAnchor>
	<!-- --- -->
	<svelte:fragment slot="trail">
		<AppRailAnchor selected={currentPath === pathName(guildId)} href={`${PathNames.Manage}/${guildId}`}>
			<svelte:fragment slot="lead">
				<img alt={guildName} class="rounded-full w-12" src={guildAvatar} />
			</svelte:fragment>
			<span>{guildName.slice(0, 10).length !== guildName.length ? `${guildName.slice(0, 10)}...` : guildName}</span>
		</AppRailAnchor>
	</svelte:fragment>
</AppRail>
