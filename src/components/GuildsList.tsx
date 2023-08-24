'use client';

import type { PartialGuild } from '@/util/types/discord';
import Image from 'next/image';
import Link from 'next/link';
import { Heading } from './ui/Heading';

type GuildsListProps = {
	guilds: PartialGuild[];
};

export const GuildsList: React.FC<GuildsListProps> = ({ guilds }) => {
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
				{guilds.map((guild) => {
					const { id, icon, name } = guild;
					const letters = name
						.replace(/'s /g, ' ')
						.replace(/\w+/g, (e) => e[0])
						.replace(/\s/g, '')
						.substring(0, 3);
					return (
						<Link href={`${guild.id}/settings`} key={guild.id}>
							<div className='grid place-items-center cursor-pointer'>
								{icon ? (
									<Image
										src={`https://cdn.discordapp.com/icons/${id}/${icon}`}
										title={name}
										alt={name}
										className='rounded-full'
										width={80}
										height={80}
									/>
								) : (
									<div
										title={name}
										className='rounded-full bg-gray-800 w-20 h-20 grid place-items-center text-2xl'>
										{letters}
									</div>
								)}
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
};
