import { PathNames } from '$lib/constants';
import { authenticateUser } from '$lib/server/discord';
import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.user = await authenticateUser(event);

	console.log(event.url.pathname);

	if (event.url.pathname.startsWith(PathNames.Manage)) {
		if (!event.locals.user) {
			throw redirect(302, PathNames.Login);
		}
	}
	return resolve(event);
};
