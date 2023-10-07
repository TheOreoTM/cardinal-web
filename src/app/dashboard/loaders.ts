import { API_URL, DISCORD_API_URL, DISCORD_TOKEN } from "@/util/constants";
import { UnauthorizedError } from "@/util/exceptions";
import { getCurrentUser } from "@/util/session";
import type { PartialGuild } from "@/util/types/discord";
import axios from "axios";
import type { APIChannel } from "discord-api-types/v9";

export async function getStatus() {
	const res = await fetch(`${API_URL}/status`, {
		headers: {
			"Authorization": `Bot ${DISCORD_TOKEN}`,
		},
	});

	const data = await res.json();
	console.log(data);
}

async function getUserGuilds(userAccessToken: string) {
	const user = await getCurrentUser();

	if (user === undefined) {
		throw new UnauthorizedError();
	}

	const res = await fetch(`${DISCORD_API_URL}/users/@me/guilds`, {
		method: "GET",
		headers: {
			"Authorization": `Bearer ${userAccessToken}`,
		},
	});
	const data: PartialGuild[] = await res.json();
	return data;
}

async function getBotGuilds() {
	const res = await fetch(`${DISCORD_API_URL}/users/@me/guilds`, {
		method: "GET",
		headers: {
			"Authorization": `Bot ${DISCORD_TOKEN}`,
		},
	});

	const data: PartialGuild[] = await res.json();
	return data;
}

export async function getMutualGuilds() {
	const user = await getCurrentUser();

	if (!user) {
		throw new UnauthorizedError();
	}

	const botGuilds = await getBotGuilds();
	const userGuilds = await getUserGuilds(user.accessToken);
	const adminUserGuilds = userGuilds.filter(
		({ permissions }) => (parseInt(permissions) & 0x8) === 0x8
	);
	return adminUserGuilds.filter((guild) =>
		botGuilds.some((botGuild) => botGuild.id === guild.id)
	);
}

export async function getGuild(id: string) {
	const res = await fetch(`${DISCORD_API_URL}/guilds/${id}`, {
		method: "GET",
		headers: {
			"Authorization": `Bot ${DISCORD_TOKEN}`,
		},
	});

	const data = await res.json();
	if (data.code === 10004) return null;
	return data as PartialGuild;
}

export async function getChannels(guildId: string) {
	const res = await axios({
		url: `${DISCORD_API_URL}/guilds/${guildId}/channels`,
		method: "GET",
		headers: {
			Authorization: `Bot ${DISCORD_TOKEN}`,
		},
	}).catch((e) => console.error(e));

	if (!res) {
		return;
	}

	const channels = res.data.filter((channel: APIChannel) => channel.type === 0);

	return channels;
}
