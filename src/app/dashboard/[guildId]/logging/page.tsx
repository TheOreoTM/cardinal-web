import Shell from '@/components/Shell';
import { Heading } from '@/components/ui/Heading';
import { Textarea } from '@/components/ui/TextArea';
import { getGuild } from '../../loaders';
import { redirect } from 'next/navigation';

async function getCurrentGuild(guildId: string) {
	const guild = await getGuild(guildId);
	return guild;
}

export default async function Logging({
	params,
}: {
	params: { guildId: string };
}) {
	const guild = await getCurrentGuild(params.guildId);
	if (!guild) return redirect('/dashboard');

	return (
		<Shell layout='dashboard'>
			<Heading
				centered={false}
				description='Change the logging settings of the server'
				title={`Logging settings for ${guild.name}`}
			/>
			<Textarea
				rows={1}
				className='w-full p-2 border resize-none'
				placeholder='Type your stuff here'
			/>
		</Shell>
	);
}
