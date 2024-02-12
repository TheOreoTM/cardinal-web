import { KoFi } from '$lib/constants';
import { redirect } from '@sveltejs/kit';

export const load = () => {
	return redirect(302, KoFi);
};
