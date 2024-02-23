import { type Appeal } from '$lib/types';
import { apiFetch } from '$lib/utils/api';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const appeal = await apiFetch<Appeal>(`/appeals/${params.appeal}`);
	return {
		appeal
	};
}) satisfies PageServerLoad;
