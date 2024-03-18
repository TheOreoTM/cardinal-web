import { apiFetch, fetchGuild } from '$lib/utils/api';
import type { APIGuildChannel, APIRole } from 'discord-api-types/v10';
import type { LayoutServerLoad } from './$types';
import { DISCORD_TOKEN } from '$env/static/private';
import type { GuildData } from '$lib/types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ params, locals, url }) => {
	const guildId = params.guildId;
	const guild = await fetchGuild(guildId);

	const data = await apiFetch<GuildData>(`/guilds/${guildId}/settings`);

	if (!data.setup && !url.pathname.endsWith('/setup')) {
		throw redirect(302, `/manage/${guildId}/setup`);
	}

	locals.guild = guild;

	const nickname = await apiFetch<{ nickname: string }>(`/guilds/${guildId}/nickname`);

	const channels = (await fetch(`https://discord.com/api/guilds/${params.guildId}/channels`, {
		headers: {
			Authorization: `Bot ${DISCORD_TOKEN}`
		}
	})
		.catch(() => {
			throw Error('Failed to fetch channels for the server');
		})
		.then(async (res) => await res.json())) as APIGuildChannel<any>[];

	const roles = (await fetch(`https://discord.com/api/guilds/${params.guildId}/roles`, {
		headers: {
			Authorization: `Bot ${DISCORD_TOKEN}`
		}
	})
		.catch(() => {
			throw Error('Failed to fetch roles for the server');
		})
		.then(async (res) => await res.json())) as APIRole[];

	return { guild, data, channels, roles, nickname };
}) satisfies LayoutServerLoad;
