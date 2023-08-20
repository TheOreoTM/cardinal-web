import type { NavItem } from '@util/types/nav';

export class DashboardConfig {
	public constructor(readonly guildId: string) {
		this.guildId = guildId;
	}

	public sidebarNav() {
		const sidebarNav = [
			{
				title: 'Settings',
				href: `/dashboard/${this.guildId}/settings`,
				icon: 'settings',
			},
			{
				title: 'Logging',
				href: `/dashboard/${this.guildId}/logging`,
				icon: 'logging',
			},
		] as NavItem[];

		return sidebarNav;
	}
}
