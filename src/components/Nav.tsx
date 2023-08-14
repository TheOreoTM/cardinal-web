import { Path } from '@util/Types';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const PATHS: Path[] = [
	{
		name: 'Login',
		path: '', // !
		jsx: (
			<button
				key='login-button'
				className='bg-nav border border-nav-button py-2 px-5 rounded-md font-semibold animated-button'
				onClick={() =>
					signIn('discord', {
						callbackUrl: '/dashboard',
					})
				}
			>
				Login
			</button>
		),
	},
	{
		name: 'Commands',
		path: '/commands',
	},
];

export default function Nav() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<header className='bg-nav md:bg-transparent md:mt-6 relative text-white py-2'>
			<div className='container mx-auto px-4 flex items-center justify-between'>
				<Link href='/' className='w-8 h-8 md:w-14 md:h-14'>
					<Image
						className='w-full h-full relative animated-button'
						src='/logo.png'
						alt='Bot logo'
						width={56}
						height={56}
					/>
				</Link>

				<nav className='hidden md:flex space-x-4'>
					{PATHS.map(({ name, jsx, path }) => {
						if (path) {
							return (
								<Link key={name} href={path}>
									<button className='py-2 px-3 rounded-md font-semibold bg-nav border border-nav-button animated-button'>
										{name}
									</button>
								</Link>
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
