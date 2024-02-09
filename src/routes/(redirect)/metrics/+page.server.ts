import { redirect } from '@sveltejs/kit';

export const load = () => {
	throw redirect(
		302,
		'https://metrics.oreotm.xyz/public-dashboards/632d073151274e99ab61e871f438602b?orgId=1'
	);
};
