import { apiFetch } from '$lib/utils/api';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();

	const nickname = body.nickname;
	const guildId = body.guildId;

	const bodyToSend = {
		nickname
	};

	const data = await apiFetch<{ data: object; guildId: string }>(
		`/guilds/${guildId}/nickname`,
		{
			method: 'POST',
			body: JSON.stringify(bodyToSend)
		}
	);

	return new Response(JSON.stringify({ ...data }), { status: 200 });
};
