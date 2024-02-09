import { redirect } from '@sveltejs/kit';

export const load = () => {
	throw redirect(302, 'https://discord.gg/Q4HTsC5yzs');
};
