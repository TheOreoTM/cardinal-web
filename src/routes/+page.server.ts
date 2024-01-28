import type { PageServerLoad } from './$types';

export const load = (async ({ url }) => {
	const error = url.searchParams.get('error');

	return {
		error: error === '' ? null : error
	};
}) satisfies PageServerLoad;
