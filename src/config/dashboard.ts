import type { NavItem } from '@util/types/nav';

export const DashboardConfig = {
	sidebarNav: [
		{
			title: 'Settings',
			href: '/dashboard/settings',
			icon: 'settings',
		},
		{
			title: 'Logging',
			href: '/dashboard/logging',
			icon: 'logging',
		},
	] satisfies NavItem[],
};
