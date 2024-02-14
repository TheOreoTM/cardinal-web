import { apiFetch, fetchGuild } from '$lib/utils/api';
import type { APIGuildChannel } from 'discord-api-types/v10';
import type { LayoutServerLoad } from './$types';
import { DISCORD_TOKEN } from '$env/static/private';
import type { GuildData } from '$lib/types';

export const load = (async ({ params, locals }) => {
	// get guild data from cardinal

	const guildId = params.guildId;
	const guild = await fetchGuild(guildId);

	const data = await apiFetch<GuildData>(`/guilds/${guildId}/settings`);

	locals.guild = guild;

	const nickname = apiFetch(`/guilds/${guildId}/nickname`);

	return { guild, data, streamed: { nickname } };
}) satisfies LayoutServerLoad;
