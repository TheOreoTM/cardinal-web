import { deleteCookies } from '$lib/utils/api';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	deleteCookies(cookies);
	return {};
}) satisfies PageServerLoad;
