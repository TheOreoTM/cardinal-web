import type { PageServerLoad } from './$types';
import { PathNames } from '$lib/constants';

export const load: PageServerLoad = async ({ url }) => {
	const guildId = url.searchParams.get('guild_id');
	console.log('🚀 ~ constload:PageServerLoad= ~ guildId:', guildId);

	if (!guildId) {
		return { to: PathNames.Manage };
	}

	return { to: `/manage/${guildId}` };
};
