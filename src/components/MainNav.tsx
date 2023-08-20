'use client';
import * as React from 'react';
import Link from 'next/link';
import { type NavItem } from '@/util/types/nav';
import { SiteConfig } from '@/config/siteConfig';
import { Icons } from '@/components/Icons';
import { cn, isActiveRoute } from '@/util/utils';
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
					{items?.map(
						(item, index) =>
							item.href && (
								<Link
									key={index}
									href={item.href}
									className={cn(
										'md:text-xs lg:text-sm flex h-full items-center p-4 border-b-2 border-b-accent border-opacity-0 hover:text-text border-t-2 border-t-transparent hover:bg-white hover:bg-opacity-5',
										{
											'cursor-not-allowed opacity-80': item.disabled,
											'border-b-2 border-b-white border-opacity-100 text-text font-semibold':
												isActiveRoute(currentPathName as string, item.href),
										}
									)}
									data-cy={`${item.title}-main-nav-link`}
								>
									{item.title}
								</Link>
							)
					)}
				</nav>
			)}
		</div>
	);
}

// {
// 	items.map(
// 		({ href, title, external }, index) =>
// 			href && (
// 				<Link
// 					key={index}
// 					href={href}
// 					target={external ? '_blank' : ''}
// 					className={cn(
// 						'hidden rounded px-2 py-1.5 hover:filter hover:brightness-75 transition-all duration-300 md:block',
// 						{
// 							'hover:filter hover:brightness-120 transition-all duration-300':
// 								isActiveRoute(currentPathName as string, href),
// 						}
// 					)}
// 				>
// 					{title}
// 					{/* <button
// 										className={cn(
// 											'py-2 px-3 rounded-md font-semibold bg-secondary text-text',

// 											{
// 												'cursor-not-allowed opacity-80': disabled,
// 												'border border-opacity-80 border-secondary text-text bg-transparent transition-all duration-500 shadow-secondary/30 shadow-[0_10px_30px_-10px] hover:shadow-none':
// 													isActiveRoute(currentPathName as string, href),
// 											}
// 										)}
// 									>
// 										{title}
// 									</button> */}
// 				</Link>
// 			)
// 	);
// }
