import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types';
import { z } from 'zod';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';
import { apiFetch, fetchGuild } from '$lib/utils/api';
import { type Appeal, type GuildData } from '$lib/types';
import { PathNames } from '$lib/constants';

const newAppealSchema = z.object({
	type: z.string().refine((value) => value === 'mute' || value === 'ban', {
		message: "Value must be either 'mute' or 'ban'"
	}),
	reason: z.string().min(1),
	appeal: z.string().min(1),
	extra: z.string().min(1)
});

export const load = (async ({ params, locals }) => {
	const user = locals.user;

	if (!user) {
		redirect(302, PathNames.Login);
	}

	const data = await apiFetch<GuildData>(`/guilds/${params.guildId}/settings`);
	const guild = await fetchGuild(params.guildId);

	const appeals: Appeal[] = await apiFetch<Appeal[]>(`/appeals?userId=${user.id}&guildId=${guild.id}`);

	const latestAppeal = appeals.sort((a, b) => b.idx - a.idx)[0];

	let eligible = true;

	if (latestAppeal) {
		const latestAppealDate = new Date(latestAppeal.createdAt);
		const oneDayBefore = new Date();
		oneDayBefore.setDate(oneDayBefore.getDate() - 1);

		if (latestAppealDate > oneDayBefore) eligible = false;
	}

	const form = await superValidate(zod(newAppealSchema));

	return { form, data, guild, eligible };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals, params }) => {
		const form = await superValidate(request, zod(newAppealSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const user = locals.user;

		if (!user) {
			redirect(302, PathNames.Login);
		}

		const appealBody: Pick<Appeal, 'appeal' | 'extra' | 'guildId' | 'muteOrBan' | 'userId'> = {
			...form.data,
			muteOrBan: form.data.type,
			userId: user.id,
			guildId: params.guildId
		};

		const appeal = await apiFetch<Appeal>('/postAppeal', {
			method: 'POST',
			body: JSON.stringify(appealBody)
		});

		redirect(302, `/appeals/${appeal.id}`);
	}
};
