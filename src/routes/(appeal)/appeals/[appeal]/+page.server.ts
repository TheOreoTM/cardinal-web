import { type Appeal } from '$lib/types';
import { apiFetch } from '$lib/utils/api';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PathNames } from '$lib/constants';

export const load = (async ({ params, locals }) => {
	try {
		const appeal = await apiFetch<Appeal>(`/appeals/${params.appeal}`);

		const user = locals.user;

		if (!user) redirect(302, PathNames.Login);

		if (appeal.userId !== user.id)
			redirect(302, `${PathNames.Appeals}?error=${encodeURIComponent('That appeal doesnt exist')}`);

		return {
			appeal
		};
	} catch {
		redirect(302, `${PathNames.Appeals}?error=${encodeURIComponent('That appeal doesnt exist')}`);
	}
}) satisfies PageServerLoad;
