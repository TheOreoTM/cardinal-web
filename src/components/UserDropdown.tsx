'use client';

import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { Icons } from './Icons';
import { Button } from './ui/Button';
import { LoginButton } from './ui/Buttons';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/DropdownMenu';
import type { User } from 'next-auth';
import { UserRole } from '@prisma/client';

export function UserDropdown({
	onOpenChange,
	user,
}: {
	onOpenChange?: (open: boolean) => void;
	user?: User & {
		role: UserRole;
	};
}) {
	return (
		<div className='flex items-center gap-4'>
			<div className='flex justify-center'>
				{user ? (
					<AccountMenu user={user} onOpenChange={onOpenChange} />
				) : (
					<LoginButton />
				)}
			</div>
		</div>
	);
}

const AccountMenu = ({
	onOpenChange,
	user,
}: {
	onOpenChange?: (open: boolean) => void;
	user: User & {
		role: UserRole;
	};
}) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='ghost'
					className='flex h-full gap-2 px-2 bg-white bg-opacity-0 lg:px-4 hover:bg-white hover:bg-opacity-5 w-[175px] lg:w-[300px]'
				>
					<Image
						className='rounded-full'
						src={user.image ?? ''}
						alt='user avatar'
						height={26}
						width={26}
					/>
					<p className='truncate'>@{user.name}</p>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align='end'
				className='bg-opacity-50 bg-background/10 backdrop-blur-2xl'
			>
				<DropdownMenuItem asChild>
					<Link
						href='/dashboard'
						className='flex items-center gap-1'
						onClick={() => onOpenChange?.(false)}
					>
						<Icons.lineChart className='w-4 h-4 mr-2' />
						<span>Dashboard</span>
					</Link>
				</DropdownMenuItem>

				{user.role === 'DEV' && (
					<DropdownMenuItem asChild>
						<Link
							href='/review'
							className='flex items-center gap-1'
							onClick={() => onOpenChange?.(false)}
						>
							<Icons.manage className='w-4 h-4 mr-2' />
							<span>Manage</span>
						</Link>
					</DropdownMenuItem>
				)}
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className='text-red-500 hover:text-white focus:bg-destructive hover:cursor-pointer'
					onClick={() => signOut({ callbackUrl: `${window.location.origin}` })}
				>
					<Icons.logout className='w-4 h-4 mr-2' />
					<span>Logout</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
