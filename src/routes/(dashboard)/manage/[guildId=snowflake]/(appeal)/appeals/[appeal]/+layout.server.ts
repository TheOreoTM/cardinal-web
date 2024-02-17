import type { LayoutServerLoad } from './$types';

export const load = (async ({ params }) => {
	const appealId = params.appeal;

	return {
		appealId
	};
}) satisfies LayoutServerLoad;
