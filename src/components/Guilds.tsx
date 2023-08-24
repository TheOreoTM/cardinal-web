import type { Guild } from '@/util/types/discord';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { Heading } from './ui/Heading';
import Image from 'next/image';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { DISCORD_API_URL } from '@/util/constants';

export default function Guilds({
	children,
	selectedGuild,
	setSelectedGuild,
}: {
	children: any;
	selectedGuild: Guild | null;
	setSelectedGuild: Dispatch<SetStateAction<Guild | null>>;
}): React.ReactNode {
	const [guilds, setGuilds] = useState<Guild[]>();
	const { data: session } = useSession();

	axios({
		url: `${DISCORD_API_URL}users/@me/guilds`,
		method: 'GET',
		headers: {
			Authorization: `Bearer ${session?.user.accessToken}`,
		},
	})
		.then(({ data }) => {
			const guilds = data.filter(
				(guild: Guild) => guild.owner || (guild.permissions && 0x8)
			);

			setGuilds(guilds);
		})
		.catch((err) => {
			console.error(err);
		});

	if (selectedGuild) {
		return children;
	}

	// if (!guilds) {
	// 	router.push('/invite');
	// 	return;
	// }

	return (
		<div className='p-6 w-full grid auto-rows-min gap-1'>
			<div className='w-full flex'>
				<div>
					<Heading
						centered={false}
						description='Select the guild you want to manage'
						title={`Select a guild`}
					/>
				</div>
				{/* <div className='hidden md:flex ml-auto'>
					<Link href={'/invite'} target='_blank'>
						<button className='px-4 py-2 bg-primary rounded-md font-semibold'>
							Invite Bot
						</button>
					</Link>
				</div> */}
			</div>
			<div className='flex flex-wrap gap-4 mt-2'>
				{guilds?.map((guild, index) => {
					const { id, icon, name } = guild;
					const letters = name
						.replace(/'s /g, ' ')
						.replace(/\w+/g, (e) => e[0])
						.replace(/\s/g, '')
						.substring(0, 3);
					return (
						<div key={index} className='grid place-items-center cursor-pointer'>
							{icon ? (
								<Image
									src={`https://cdn.discord.com/icons/${id}/${icon}`}
									title={name}
									onClick={setSelectedGuild.bind(null, guild)}
									alt={name}
									className='rounded-full'
									width={80}
									height={80}
								/>
							) : (
								<div className='rounded-full bg-gray-800 w-20 h-20 grid place-items-center text-2xl'>
									{letters}
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}
