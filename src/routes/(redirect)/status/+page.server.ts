import { redirect } from '@sveltejs/kit';

export const load = () => {
	return redirect(302, 'https://status.oreotm.xyz');
};
