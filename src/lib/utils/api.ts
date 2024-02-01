import { DISCORD_OAUTH_CLIENT_SECRET, DISCORD_TOKEN } from '$env/static/private';
import { PUBLIC_BASE_WEB_URL } from '$env/static/public';
import { ACCESS_TOKEN_COOKIE, BOT_ID, DISCORD_API_URL, REFRESH_TOKEN_COOKIE } from '$lib/constants';
import type { Cookies } from '@sveltejs/kit';
import type { APIGuild } from 'discord-api-types/v10';

export const fetchGuild = async (guildId: string): Promise<APIGuild> => {
	const response = await fetch(`${DISCORD_API_URL}/guilds/${guildId}`, {
		headers: {
			Authorization: `Bot ${DISCORD_TOKEN}`
		}
	});

	const json = await response.json();

	if (json.message) {
		throw json.message;
	}

	return json;
};

export const fetchBotGuilds = async (): Promise<APIGuild[]> => {
	const request = await fetch(`${DISCORD_API_URL}/users/@me/guilds`, {
		headers: {
			Authorization: `Bot ${DISCORD_TOKEN}`
		}
	});

	const response = await request?.json();

	if (response.error) {
		throw response.error;
	}

	return response;
};

export const fetchUserGuilds = async (token: string): Promise<APIGuild[]> => {
	const request = await fetch(`${DISCORD_API_URL}/users/@me/guilds`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	const response = await request?.json();

	if (response.error) {
		throw response.error;
	}

	return response;
};

export const requestDiscordToken = async (searchParams: URLSearchParams): Promise<Tokens> => {
	// performing a Fetch request to Discord's token endpoint
	const request = await fetch(`${DISCORD_API_URL}/oauth2/token`, {
		method: 'POST',
		body: new URLSearchParams(searchParams),
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
	});

	const response = await request?.json();

	if (response.error) {
		throw response.error;
	}

	// redirect user to front page with cookies set
	const access_expire = new Date(Date.now() + response.expires_in * 1000); // 7 days
	const refresh_expire = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
	return {
		access_token: response.access_token,
		refresh_token: response.refresh_token,
		access_valid_until: access_expire,
		refresh_valid_until: refresh_expire
	};
};

export function buildSearchParams(
	scope: string,
	type: 'callback' | 'refresh',
	code: string
): URLSearchParams {
	const searchParams = new URLSearchParams();
	searchParams.append('client_id', BOT_ID);
	searchParams.append('client_secret', DISCORD_OAUTH_CLIENT_SECRET);
	searchParams.append('grant_type', type === 'callback' ? 'authorization_code' : 'refresh_token');
	searchParams.append(type === 'callback' ? 'code' : 'refresh_token', code);
	searchParams.append('redirect_uri', `${PUBLIC_BASE_WEB_URL}/callback`);
	searchParams.append('scope', scope);
	return searchParams;
}

export function setCookies(tokens: Tokens, cookies: Cookies) {
	cookies.set(ACCESS_TOKEN_COOKIE, tokens.access_token, {
		path: '/',
		expires: tokens.access_valid_until,
		httpOnly: true,
		sameSite: 'strict'
	});
	cookies.set(REFRESH_TOKEN_COOKIE, tokens.refresh_token, {
		path: '/',
		expires: tokens.refresh_valid_until,
		httpOnly: true,
		sameSite: 'strict'
	});
}

export function deleteCookies(cookies: Cookies) {
	cookies.delete(ACCESS_TOKEN_COOKIE, { path: '/' });
	cookies.delete(REFRESH_TOKEN_COOKIE, { path: '/' });
}

export type Tokens = {
	access_token: string;
	refresh_token: string;
	access_valid_until: Date;
	refresh_valid_until: Date;
};
