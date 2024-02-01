import { fetchGuild } from '$lib/utils/api';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
	// get guild data from cardinal
	const guildId = params.guildId;
	const guild = await fetchGuild(guildId);
	locals.guild = guild;

	return { guild };
}) satisfies LayoutServerLoad;
