import Shell from '@/components/Shell';
import { getMutualGuilds } from '../loaders';
import { GuildsList } from '@/components/GuildsList';

export default async function SelectGuildsPage({}) {
	const guilds = await getMutualGuilds();
	return (
		<Shell layout='dashboard'>
			<GuildsList guilds={guilds} />
		</Shell>
	);
}
