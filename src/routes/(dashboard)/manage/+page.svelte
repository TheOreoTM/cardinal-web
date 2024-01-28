<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { getGuildAvatarUrl } from '$lib/utils/common';

	export let data: PageData;
	const { mutual, unmutual } = data.guilds;
</script>

<div class="logo-cloud grid-cols-1 lg:!grid-cols-3 gap-1">
	{#each mutual as guild}
		<a href={`/manage/${guild.id}`} class="logo-item">
			<span><Avatar src={getGuildAvatarUrl(guild.id, guild.icon)} /></span>
			<span class="text-xs"
				>{guild.name}
				<p class="text-xs font-normal text-surface-400/80">Click to manage this server</p>
			</span>
		</a>
	{/each}
	{#each unmutual as guild}
		<a href={`/manage/${guild.id}`} class="logo-item opacity-50">
			<span><Avatar src={getGuildAvatarUrl(guild.id, guild.icon)} /></span>
			<span class="text-xs text-gray-300"
				>{guild.name}
				<p class="text-xs font-normal text-surface-400/80">
					Click to invite Cardinal to this server
				</p></span
			>
		</a>
	{/each}
</div>
