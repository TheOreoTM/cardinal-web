'use client';

import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import { Fragment } from 'react';
import { HiBars3 } from 'react-icons/hi2';
import type { NavItem } from '@/util/types/nav';

export default function NavbarDropdown({ items }: { items: NavItem[] }) {
	return (
		<Menu as='nav' className='relative inline-block text-left'>
			<div>
				<Menu.Button className='mr-1 rounded-lg p-1 transition-all duration-300 hover:bg-secondary md:hidden'>
					<HiBars3 className='h-6 w-6 text-text' />
				</Menu.Button>
			</div>
			<Transition
				as={Fragment}
				enter='transition ease-out duration-100'
				enterFrom='transform opacity-0 scale-95'
				enterTo='transform opacity-100 scale-100'
				leave='transition ease-in duration-75'
				leaveFrom='transform opacity-100 scale-100'
				leaveTo='transform opacity-0 scale-95'
			>
				<Menu.Items className='bg- absolute left-0 mt-2 w-56 origin-top-left divide-y divide-slate-700 rounded-md bg-secondary border border-slate-800 shadow-lg ring-opacity-5 focus:outline-none'>
					<div className='px-1 py-1 '>
						{items.map(({ href, label }) => {
							href === undefined ? (href = '#') : (href = href);

							return (
								<Menu.Item key={href}>
									<Link
										href={href}
										className='group flex w-full items-center rounded-md px-2 py-2 text-sm text-text hover:bg-secondary-dark'
									>
										{label}
									</Link>
								</Menu.Item>
							);
						})}
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
