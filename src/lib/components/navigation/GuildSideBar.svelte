<script lang="ts">
	import { page } from '$app/stores';
	import { PathNames } from '$lib/constants';
	import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';

	$: currentPath = $page.url.pathname;

	$: pathName = (path: string) => {
		return `${PathNames.Manage}/${$page.data.guild.id}/${path}`;
	};
</script>

<AppRail class="min-h-screen">
	<AppRailAnchor
		href={pathName('moderation')}
		selected={currentPath === pathName('moderation')}
		name="moderation"
		value={0}
		title="Moderation"
	>
		<svelte:fragment slot="lead"><i class="fa-solid fa-gavel text-2xl" /></svelte:fragment>
		<span>Moderation</span>
	</AppRailAnchor>
	<AppRailAnchor
		href={pathName('stats')}
		selected={currentPath === pathName('stats')}
		name="stats"
		value={1}
		title="Stats"
	>
		<svelte:fragment slot="lead"><i class="fa-solid fa-trophy text-2xl" /></svelte:fragment>
		<span>Stats</span>
	</AppRailAnchor>
	<AppRailAnchor
		href={pathName('suggestion')}
		selected={currentPath === pathName('suggestion')}
		name="suggestion"
		value={2}
		title="Suggestion"
	>
		<svelte:fragment slot="lead"><i class="fa-regular fa-lightbulb text-2xl"></i></svelte:fragment>
		<span>Suggestion</span>
	</AppRailAnchor>
	<AppRailAnchor
		href={pathName('starboard')}
		selected={currentPath === pathName('starboard')}
		name="starboard"
		value={3}
		title="Starboard"
	>
		<svelte:fragment slot="lead"><i class="fa-regular fa-star text-2xl"></i></svelte:fragment>
		<span>Starboard</span>
	</AppRailAnchor>
	<!-- --- -->
	<svelte:fragment slot="trail"></svelte:fragment>
</AppRail>
