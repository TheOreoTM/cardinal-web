import { DISCORD_AUTH_URI, PathNames } from '$lib/constants';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
	return new Response(null, {
		headers: { Location: locals.user ? PathNames.Manage : DISCORD_AUTH_URI },
		status: 302
	});
};
