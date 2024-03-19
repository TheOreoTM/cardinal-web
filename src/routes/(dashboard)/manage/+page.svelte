<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { getGuildAvatarUrl } from '$lib/utils/common';
	import { PathNames } from '$lib/constants';
	import { PUBLIC_BASE_WEB_URL } from '$env/static/public';

	function generateInviteLink(guildId: string) {
		const url = `https://discord.com/oauth2/authorize?redirect_uri=${PUBLIC_BASE_WEB_URL}/return&response_type=code&scope=bot&client_id=740962735306702858&permissions=1633094593750&guild_id=${guildId}`;
		return url;
	}

	export let data: PageData;
	const { mutual, unmutual } = data.guilds!;
	const totalGuildAmount = mutual.length + unmutual.length;
</script>

{#if totalGuildAmount === 0}
	You dont have any guilds you can manage or guilds that you can manage with cardinal in it. Come back after
	you invite cardinal to a server that you own/manage
{:else}
	<div class="logo-cloud grid-cols-1 lg:!grid-cols-3 gap-1">
		{#each mutual as guild}
			<a href={`/manage/${guild.id}`} class="logo-item" data-sveltekit-preload-data="hover">
				<span><Avatar src={getGuildAvatarUrl(guild.id, guild.icon)} /></span>
				<span class="text-xs"
					>{guild.name}
					<p class="text-xs font-normal text-surface-400/80">Click to manage this server</p>
				</span>
			</a>
		{/each}
		{#each unmutual as guild}
			<a
				href={`${generateInviteLink(guild.id)}`}
				class="logo-item opacity-50 hover:opacity-100 transition duration-200"
				data-sveltekit-preload-data="off"
			>
				<span><Avatar src={getGuildAvatarUrl(guild.id, guild.icon)} /></span>
				<span class="text-xs text-gray-300"
					>{guild.name}
					<p class="text-xs font-normal text-surface-400/80">Click to invite Cardinal to this server</p></span
				>
			</a>
		{/each}
	</div>
{/if}
