import { DISCORD_TOKEN } from '$env/static/private';
import type { APIRole } from 'discord-api-types/v10';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, params }) => {
	const roles = (await fetch(
		`https://discord.com/api/guilds/${params.guildId}/roles`,
		{
			headers: {
				Authorization: `Bot ${DISCORD_TOKEN}`
			}
		}
	)
		.catch(() => {
			throw Error('Failed to fetch roles for the server');
		})
		.then(async (res) => await res.json())) as APIRole[];

	return {
		roles
	};
}) satisfies PageServerLoad;
