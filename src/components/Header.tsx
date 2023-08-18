import { SiteConfig } from '@/config/siteConfig';
// import { MobileNav } from './MobileNav';
import { MainNav } from './MainNav';
import { UserDropdown } from './UserDropdown';
import { getCurrentUser } from '@/util/session';

export async function Header() {
	const user = await getCurrentUser();
	return (
		<header className='sticky top-0 z-40 flex w-full shadow-accent bg-opacity-50 bg-background/10 backdrop-blur-md'>
			<div className='flex items-center justify-between w-full px-4 space-x-4 h-14 sm:space-x-0'>
				<div className='flex-1 h-full'>
					<MainNav items={SiteConfig.getHeaderLinks(!!user)} />
				</div>
				{/* <MobileNav items={SiteConfig.getHeaderLinks(!!user)}/> */}{' '}
				{/* TODO: Make this an actual mobile nav */}
				<nav className='items-center hidden h-full space-x-2 md:flex'>
					<UserDropdown user={user} />
				</nav>
			</div>
		</header>
	);
}

export default Header;
