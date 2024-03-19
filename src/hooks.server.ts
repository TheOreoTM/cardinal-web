import { PathNames } from '$lib/constants';
import { authenticateUser } from '$lib/server/discord';
import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

const protectedPaths = [PathNames.Manage, PathNames.Appeals];

export const handle: Handle = async ({ event, resolve }) => {
	if (!event.locals.user) {
		try {
			event.locals.user = await authenticateUser(event);
		} catch (error) {
			console.log('Authentication error:', error);
			redirect(302, PathNames.Home);
		}
	}
	if (protectedPaths.some((path) => event.url.pathname.startsWith(path)) && !event.locals.user) {
		try {
			event.locals.user = await authenticateUser(event);
		} catch (error) {
			console.log('Authentication error:', error);
			redirect(302, PathNames.Home);
		}
		if (!event.locals.user) {
			throw redirect(302, PathNames.Login);
		}
	}
	return resolve(event);
};
