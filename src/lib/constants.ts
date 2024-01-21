import { env } from '$env/dynamic/private';
import { PUBLIC_DISCORD_OAUTH_CLIENT_ID } from '$env/static/public';

export const PathNames = {
	Home: '/',
	Discord: '/discord',
	Login: '/login',
	Logout: '/logout',
	Invite: '/invite',
	Docs: '/docs'
};

export const BOT_TOKEN = env.DISCORD_TOKEN;
export const BOT_ID = PUBLIC_DISCORD_OAUTH_CLIENT_ID;
export const CLIENT_SECRET = env.DISCORD_OAUTH_CLIENT_SECRET;
