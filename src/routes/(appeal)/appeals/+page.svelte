<script lang="ts">
	import Meta from '$components/Meta.svelte';
	import Heading from '$components/ui/Heading.svelte';
	import { PathNames } from '$lib/constants';
	import { Avatar } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { getGuildAvatarUrl } from '$lib/utils/common';

	export let data: PageData;
	const appeals = data.appeals;
</script>

<Meta title="Appeals" />

<Heading title="Your Appeals" centered />

<div class="logo-cloud grid-cols-1 lg:!grid-cols-3 gap-1">
	{#each appeals as appeal}
		<a href={`${PathNames.Appeals}/${appeal.id}`} class="logo-item" data-sveltekit-preload-data="hover">
			<span><Avatar src={getGuildAvatarUrl(appeal.guildId, appeal.guildIcon)} /></span>
			<span class="text-xs"
				>{appeal.reason}
				<!-- <p class="text-xs font-normal text-surface-400/80">
					Status: {appeal.status}
				</p> -->
				<p class="text-xs font-normal text-surface-400/80">
					Appeal for {appeal.guildName}
				</p>
			</span>
		</a>
	{/each}
</div>
