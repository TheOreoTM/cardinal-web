import { PathNames } from '$lib/constants';
import { authenticateUser } from '$lib/server/discord';
import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	try {
		event.locals.user = await authenticateUser(event);
	} catch (error) {
		console.log('CALM DOWN BUDDY');
	}
	if (event.url.pathname.startsWith(PathNames.Manage)) {
		if (!event.locals.user) {
			throw redirect(302, PathNames.Login);
		}
	}
	return resolve(event);
};
