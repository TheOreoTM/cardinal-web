import { stateRedirect } from '$lib/stores/state';
import { buildSearchParams, requestDiscordToken, setCookies } from '$lib/utils/api';
import { string } from 'zod';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({
	url,
	cookies,
	locals
}): Promise<{ loggedIn: boolean; state?: string; error?: string }> => {
	if (locals.user) return { loggedIn: true };
	// fetch returnCode set in the URL parameters.
	const returnCode = url.searchParams.get('code');
	const state = url.searchParams.get('state');
	if (!returnCode) {
		return { loggedIn: false, error: 'No code provided.' };
	}
	try {
		const tokens = await requestDiscordToken(buildSearchParams('callback', returnCode));
		setCookies(tokens, cookies);

		return { loggedIn: true, state: state ?? undefined };
	} catch (e) {
		console.error(e);
		return { loggedIn: false, error: 'Failed to authenticate with Discord.' };
	}
};
