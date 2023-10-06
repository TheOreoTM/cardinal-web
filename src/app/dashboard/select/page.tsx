import Shell from "@/components/Shell";
import { getMutualGuilds, getStatus } from "../loaders";
import { GuildsList } from "@/components/GuildsList";

export default async function SelectGuildsPage({}) {
	const guilds = await getMutualGuilds();
	await getStatus();
	return (
		<Shell layout="dashboard">
			<GuildsList guilds={guilds} />
		</Shell>
	);
}
