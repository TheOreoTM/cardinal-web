<script lang="ts">
	import Meta from '$components/Meta.svelte';
	import { getGuildAvatarUrl } from '$lib/utils/common';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Meta
	title="Moderation Settings"
	blockRobots
	logo={getGuildAvatarUrl(data.guild.id, data.guild.icon)}
	guildName={data.guild.name}
/>

Hey {data.guild.name}
