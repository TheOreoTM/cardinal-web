'use client';

import { type Path } from '@/util/types/paths';
import Link from 'next/link';
import { useState } from 'react';
import { HiOutlineCog, HiOutlineDocumentDuplicate } from 'react-icons/hi2';

const PATHS: Path[] = [
	{
		name: 'Settings',
		path: '/dashboard/settings',
		icon: <HiOutlineCog className='h-7 w-7' />,
		label: 'Settings',
	},
	{
		name: 'Logging',
		path: '/dashboard/logging',
		icon: <HiOutlineDocumentDuplicate className='h-7 w-7' />,
		label: 'Logging',
	},
];

export default function DashNav() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<header className='bg-transparent md:h-full md:w-20 md:border-r-2 md:border-secondary relative text-white py-6'>
			<div className='container mx-auto flex items-center justify-between'>
				<nav className='hidden md:grid justify-items-center w-full gap-6 mt-4'>
					{PATHS.map(({ name, jsx, path, icon }) => {
						if (path) {
							return (
								<div
									key={name}
									className='w-full h-10 grid place-items-center relative'
								>
									<div />
									<Link href={path}>{icon!}</Link>
									<p className='text-xs'>{name}</p>
								</div>
							);
						}

						return jsx;
					})}
				</nav>

				<button
					className='flex flex-col gap-1 p-2 md:hidden ml-auto'
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
