import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/logo.png';
import { HiExternalLink } from 'react-icons/hi';

const PATHS: Record<
	string,
	{ path: string; name: string; newTab?: boolean }[]
> = {
	'Category 1': [
		{ path: '/', name: 'Path' },
		{ path: '/', name: 'PathPath' },
		{ path: '/', name: 'PathPathPath', newTab: true },
	],
	'Category 2': [
		{ path: '/', name: 'Path', newTab: true },
		{ path: '/', name: 'PathPath', newTab: true },
		{ path: '/', name: 'PathPathPath', newTab: true },
		{ path: '/', name: 'PathPathPathPath', newTab: true },
	],
};

export default function Footer() {
	return (
		<footer className='mb-12 mt-24 flex justify-center'>
			<div className='flex w-full max-w-5xl flex-col gap-6 px-4 text-left lg:flex-row lg:gap-0'>
				<div className='flex flex-col lg:min-w-max'>
					<div className='mb-4 flex items-center gap-2'>
						<Image
							src={logo}
							className='h-12 w-12 rounded-full'
							alt='Reindeer Logo'
						/>
						<h1 className='text-2xl font-bold text-slate-300'>
							Cardinal Project
						</h1>
					</div>
					<p>
						Made with ❤️ by{' '}
						<a
							className='rounded bg-slate-900 px-1 text-blue-500 pt-[2px] text-sm hover:underline cursor-pointer'
							href='https://discord.com/users/947780201973182525'
							target='_blank'
						>
							<code>@sed_person</code>
						</a>{' '}
						using Wix.com
					</p>
				</div>
				<div className='flex w-full flex-col justify-end gap-4 text-left lg:flex-row lg:gap-16'>
					{Object.entries(PATHS).map(([category, paths]) => (
						<div key={category} className='flex flex-col'>
							<h2 className='mb-3 font-semibold uppercase tracking-wide'>
								{category}
							</h2>
							<div className='flex gap-3 lg:flex-col lg:gap-2'>
								{paths.map(({ path, name, newTab }) => (
									<span key={path} className='group flex items-center gap-1'>
										{newTab ? (
											<>
												<a
													href={path}
													target='_blank'
													className='text-slate-300 transition-all hover:text-primary'
												>
													{name}
												</a>
												<HiExternalLink className='opacity-0 transition-all group-hover:opacity-100' />
											</>
										) : (
											<Link
												href={path}
												className='text-slate-300 transition-all hover:text-primary'
											>
												{name}
											</Link>
										)}
									</span>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</footer>
	);
}
