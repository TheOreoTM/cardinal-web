import { buildSearchParams, requestDiscordToken, setCookies } from '$lib/utils/api';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PathNames } from '$lib/constants';

export const load: PageServerLoad = async ({ url, cookies, locals }) => {
	const guildId = url.searchParams.get('guild_id');

	if (!guildId) {
		return redirect(302, PathNames.Manage);
	}

	return redirect(302, `${PathNames.Manage}/${guildId}`);
};
