'use client';
import * as React from 'react';
import Link from 'next/link';
import { type NavItem } from '@/util/types/nav';
import { SiteConfig } from '@/config/siteConfig';
import { isActiveRoute, cn } from '@util/utils';
import { Icons } from '@/components/Icons';
import { usePathname } from 'next/navigation';

export function MainNav({ items }: { items?: NavItem[] }) {
	const currentPathName = usePathname();

	return (
		<div className='flex items-center h-full gap-6 lg:gap-10'>
			<Link href='/' className='flex items-center space-x-3'>
				<Icons.logo width={30} height={30} />
				<span className='inline-block text-text text-lg font-bold'>
					{SiteConfig.name}
				</span>
			</Link>
			{items?.length && (
				<nav className='items-center flex-1 hidden h-full md:flex'>
					{/* {items?.map(
						(item, index) =>
							item.href && (
								<Link
									key={index}
									href={item.href}
									className={cn(
										'md:text-xs lg:text-sm flex h-full items-center p-4 border-b-2 border-b-yellow-500 border-opacity-0 hover:text-yellow-500 border-t-2 border-t-transparent hover:bg-white hover:bg-opacity-5',
										{
											'cursor-not-allowed opacity-80': item.disabled,
											'border-b-2 border-b-yellow-500 border-opacity-100 text-yellow-500 decoration-2 decoration-primary':
												isActiveRoute(currentPathName as string, item.href),
										}
									)}
									data-cy={`${item.title}-main-nav-link`}
								>
									{item.title}
								</Link>
							)
					)} */}
					{items.map(({ href, title, external }) => {
						return href ? (
							<Link
								key={href}
								href={href}
								target={external ? '_blank' : ''}
								className='hidden rounded px-2 py-1.5 hover:filter hover:brightness-75 transition-all duration-300 md:block'
							>
								<button className='py-2 px-3 rounded-md font-semibold bg-accent text-background'>
									{title}
								</button>
							</Link>
						) : (
							<Link
								key={title}
								href={'#'}
								className='hidden rounded px-2 py-1.5 hover:filter hover:brightness-75 transition-all duration-300 md:block'
							>
								<button className='py-2 px-3 rounded-md font-semibold bg-accent text-background'>
									{title}
								</button>
							</Link>
						);
					})}
				</nav>
			)}
		</div>
	);
}
