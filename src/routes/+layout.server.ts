import { apiFetch } from '$lib/utils/api';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const botStats = (await apiFetch('/stats').catch(() => null)) as {
		guildAmount: number;
		memberAmount: number;
		channelAmount: number;
		commandsUsed: number;
		version: string;
	} | null;

	return {
		user: locals.user,
		stats: botStats
			? botStats
			: {
					guildAmount: 0,
					memberAmount: 0,
					channelAmount: 0,
					commandsUsed: 0,
					version: '0.0.0'
				}
	};
}) satisfies LayoutServerLoad;
