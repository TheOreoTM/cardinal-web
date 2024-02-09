import { deleteCookies } from '$lib/utils/api';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PathNames } from '../../../lib/constants';

export const load = (async ({ cookies }) => {
	deleteCookies(cookies);
	return redirect(
		302,
		`${PathNames.Home}?message=${encodeURIComponent('Logged out')}`
	);
}) satisfies PageServerLoad;
