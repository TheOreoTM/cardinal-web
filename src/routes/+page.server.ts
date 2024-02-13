import { apiFetch } from '$lib/utils/api';
import type { PageServerLoad } from './$types';

export const load = (async ({ url }) => {
	const error = url.searchParams.get('error');
	const message = url.searchParams.get('message');

	const botStats = await apiFetch('/stats');

	return {
		error: error === '' ? null : error,
		message: message === '' ? null : message,
		stats: botStats as {
			guildAmount: number;
			memberAmount: number;
			channelAmount: number;
			commandsUsed: number;
		}
	};
}) satisfies PageServerLoad;
