import { BOT_INVITE_URL } from '$lib/constants';
import { redirect } from '@sveltejs/kit';

export const load = () => {
	return redirect(302, BOT_INVITE_URL);
};
