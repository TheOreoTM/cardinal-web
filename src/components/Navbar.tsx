import Image from 'next/image';
import Link from 'next/link';
import NavbarDropdown from './NavbarDropdown';
import { Path } from '@util/Types';

const PATHS: Path[] = [
	{ path: '/docs/introduction/getting-started', name: 'Commands' },
	{ path: '/metrics', name: 'Dashboard', newTab: true },
	{ path: '/vote', name: 'Support Server', newTab: true },
	{ path: '/login', name: 'Login' },
];

export default function Navbar() {
	return (
		<header className='sticky top-0 z-20 flex justify-center bg-secondary py-3 shadow'>
			<div className='mx-4 flex w-full max-w-7xl items-center justify-center text-left'>
				<NavbarDropdown paths={PATHS} />
				<Link href='/'>
					<div className='flex items-center gap-2'>
						<Image
							src={'/bot-icon.png'}
							className='h-8 w-8 rounded-full md:h-10 md:w-10'
							width={32}
							height={32}
							alt='Cardinal Logo'
						/>
						<h1 className='text-lg font-bold text-slate-300 transition-all duration-300 hover:text-slate-200 md:text-xl'>
							Cardinal
						</h1>
					</div>
				</Link>
				<nav className='flex w-full justify-end gap-2 text-right'>
					{PATHS.map(({ path, name, newTab }) =>
						newTab ? (
							<a
								key={path}
								href={path}
								target='_blank'
								className='hidden rounded px-2 py-1.5 dark:hover:filter dark:hover:brightness-75 transition-all duration-300 md:block'
							>
								<button className='py-2 px-3 rounded-md font-semibold bg-accent text-background'>
									{name}
								</button>
							</a>
						) : (
							<Link
								key={path}
								href={path}
								className='hidden rounded px-2 py-1.5 dark:hover:filter dark:hover:brightness-75 transition-all duration-300 md:block'
							>
								<button className='py-2 px-3 rounded-md font-semibold bg-accent text-background'>
									{name}
								</button>
							</Link>
						)
					)}
				</nav>
			</div>
		</header>
	);
}
