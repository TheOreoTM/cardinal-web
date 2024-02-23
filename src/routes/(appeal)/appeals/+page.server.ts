import { apiFetch } from '$lib/utils/api';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PathNames } from '$lib/constants';
import { type Appeal } from '$lib/types';

export const load = (async ({ locals }) => {
	const user = locals.user;
	if (!user) redirect(302, PathNames.Login);
	const appeals = await apiFetch<Appeal[]>(`/appeals?userId=${user.id}`);
	return { appeals };
}) satisfies PageServerLoad;
