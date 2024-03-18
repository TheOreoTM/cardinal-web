import { getOrRefreshToken } from '$lib/server/discord';
import { fetchBotGuilds, fetchUserGuilds } from '$lib/utils/api';
import type { LayoutServerLoad } from './$types';

export const load = (async (event) => {
	const accessToken = await getOrRefreshToken(event);
	if (!accessToken) return { guilds: { mutual: [], unmutual: [] } };

	const [botGuilds, userGuilds] = await Promise.all([fetchBotGuilds(), fetchUserGuilds(accessToken)]).catch(
		(e) => {
			console.error(e);
			return [[], []];
		}
	);

	const managerGuilds = userGuilds.filter((userGuild) => {
		// Check if the user has the "Manage Server" permission
		return (Number(userGuild.permissions) & 0x8) === 0x8;
	});

	const mutualManagerGuilds = managerGuilds.filter((guild) =>
		botGuilds.some((userGuild) => {
			return userGuild.id === guild.id;
		})
	);

	const unmutualManagerGuilds = managerGuilds.filter(
		(guild) =>
			// Every guild in managerGuilds that isnt in mutualManagerGuilds

			!mutualManagerGuilds.some((mutualGuild) => {
				return mutualGuild.id === guild.id;
			})
	);

	event.locals.guilds = {
		mutual: mutualManagerGuilds,
		unmutual: unmutualManagerGuilds
	};

	return {
		guilds: {
			mutual: mutualManagerGuilds,
			unmutual: unmutualManagerGuilds
		}
	};
}) satisfies LayoutServerLoad;
