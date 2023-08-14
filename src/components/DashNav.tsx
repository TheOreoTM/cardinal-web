import { Path } from '@util/Types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const PATHS: Path[] = [
	{
		name: 'Basic Settings',
		path: '/dashboard/settings',
		icon: '/guildsettings.png',
	},
	{
		name: 'Logging',
		path: '/dashboard/logging',
		icon: '/logging.png',
	},
];

export default function DashNav() {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<header className='bg-nav md:h-full md:w-20 md:border-r-2 md:border-zinc-700 relative text-white py-2'>
			<div className='container mx-auto flex items-center justify-between'>
				<nav className='hidden md:grid justify-items-center w-full gap-6 mt-4'>
					{PATHS.map(({ name, jsx, path }) => {
						if (path) {
							return (
								<div
									key={name}
									className='w-full h-10 grid place-items-center relative'
								>
									<div />
									<Link href={path}>
										<button className='py-2 px-3 rounded-md font-semibold bg-nav border border-nav-button animated-button'>
											{name}
										</button>
									</Link>
								</div>
							);
						}

						return jsx;
					})}
				</nav>

				<button
					className='flex flex-col gap-1 p-2 md:hidden'
					onClick={() => setIsOpen(!isOpen)}
				>
					<div className='w-6 h-1 bg-white rounded-md'></div>
					<div className='w-6 h-1 bg-white rounded-md'></div>
					<div className='w-6 h-1 bg-white rounded-md'></div>
				</button>

				<nav
					className={`bg-nav w-full p-4 absolute top-12 left-0 z-50 rounded-lg ${
						isOpen ? 'flex md:hidden' : 'hidden'
					}`}
				>
					<div className='flex flex-col gap-1 w-full'>
						{PATHS.map(({ name, jsx, path }) => {
							if (path) {
								return (
									<Link
										key={name}
										href={path}
										className='bg-nav border border-nav-button py-2 px-5 rounded-md font-semibold text-center'
									>
										<button>{name}</button>
									</Link>
								);
							}

							return jsx;
						})}
					</div>
				</nav>
			</div>
		</header>
	);
}
