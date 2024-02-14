import type { PageServerLoad } from './$types';

export const load = (async ({ url }) => {
	const error = url.searchParams.get('error');
	const message = url.searchParams.get('message');

	return {
		error: error === '' ? null : error,
		message: message === '' ? null : message
	};
}) satisfies PageServerLoad;
