import { apiFetch } from '$lib/utils/api';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();

	const setting = body.setting;
	const value = body.value;
	const module = body.module;
	const guildId = body.guildId;

	const bodyToSend = {
		setting,
		module,
		value
	};

	try {
		const data = await apiFetch<{ data: object; guildId: string }>(`/guilds/${guildId}/settings`, {
			method: 'POST',
			body: JSON.stringify(bodyToSend)
		});
		return new Response(JSON.stringify({ ...data }), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: error }));
	}
};
