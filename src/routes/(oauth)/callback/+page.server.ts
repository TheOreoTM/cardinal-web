import {
	buildSearchParams,
	requestDiscordToken,
	setCookies
} from '$lib/utils/api';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PathNames } from '$lib/constants';
import { browser } from '$app/environment';

export const load: PageServerLoad = async ({ url, cookies, locals }) => {
	if (locals.user) return { loggedIn: true };
	// fetch returnCode set in the URL parameters.
	const returnCode = url.searchParams.get('code');
	if (!returnCode) {
		return { loggedIn: false, error: 'No code provided.' };
	}
	try {
		const tokens = await requestDiscordToken(
			buildSearchParams('callback', returnCode)
		);
		setCookies(tokens, cookies);
	} catch (e: any) {
		console.error(e);
		redirect(
			302,
			`${PathNames.Home}?error=${encodeURIComponent(`${e.message}` ?? 'Unknown error')}`
		);
	}

	redirect(
		302,
		`${PathNames.Home}?message=${encodeURIComponent('Logged in successfully')}`
	);
};
