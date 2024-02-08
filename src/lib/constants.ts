import {
	PUBLIC_BASE_WEB_URL,
	PUBLIC_DISCORD_OAUTH_CLIENT_ID
} from '$env/static/public';

export const PathNames = {
	Home: '/',
	Discord: '/discord',
	Login: '/login',
	Logout: '/logout',
	Invite: '/invite',
	Docs: '/docs',
	Manage: '/manage',
	Premium: '/premium'
};

export const BOT_ID = PUBLIC_DISCORD_OAUTH_CLIENT_ID;
export const ACCESS_TOKEN_COOKIE = 'discord_access_token';
export const REFRESH_TOKEN_COOKIE = 'discord_refresh_token';
export const DISCORD_API_URL = 'https://discord.com/api/v10';

export const DISCORD_AUTH_URI = `https://discord.com/api/oauth2/authorize?client_id=${BOT_ID}&response_type=code&redirect_uri=${encodeURI(
	`${PUBLIC_BASE_WEB_URL}/callback`
)}&scope=identify+guilds`;
