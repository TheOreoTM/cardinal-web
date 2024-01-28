import { fetchGuild } from '$lib/utils/api';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	// get guild data from cardinal
	const guildId = params.guildId;
	const base = await fetchGuild(guildId);
	return { guild: base };
}) satisfies PageServerLoad;
