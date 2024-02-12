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
	Premium: '/premium',
	Commands: '/commands',
	Github: 'https://github.com/theoreotm/cardinal-bot',
	Kofi: '/kofi',
	Terms: '/terms',
	Privacy: '/privacy',
	Status: '/status',
	Metrics: '/metrics',
	Patreon: '/patreon'
};

export const KoFi = 'https://ko-fi.com/theoreotm';
export const BOT_ID = PUBLIC_DISCORD_OAUTH_CLIENT_ID;
export const ACCESS_TOKEN_COOKIE = 'discord_access_token';
export const REFRESH_TOKEN_COOKIE = 'discord_refresh_token';
export const DISCORD_API_URL = 'https://discord.com/api/v10';
export const BOT_INVITE_URL =
	'https://discord.com/api/oauth2/authorize?client_id=740962735306702858&permissions=1633094593750&scope=bot%20applications.commands';

export const DISCORD_AUTH_URI = `https://discord.com/api/oauth2/authorize?client_id=${BOT_ID}&response_type=code&redirect_uri=${encodeURI(
	`${PUBLIC_BASE_WEB_URL}/callback`
)}&scope=identify+guilds`;
