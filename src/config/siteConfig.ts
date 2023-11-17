import type { NavItem } from "@/util/types/nav";

export const SiteConfig = {
	name: "Cardinal Bot",
	description: "The bot with all your favourite features",

	getHeaderLinks: (isLoggedIn: boolean) => {
		const items: NavItem[] = [
			{
				title: "Commands",
				href: "/commands",
			},
			{
				title: "Support Server",
				href: "/support",
			},
			{
				title: "Docs",
				href: "/docs",
			},
		];

		if (isLoggedIn) {
			items.push({
				title: "Dashboard",
				href: "/dashboard",
			});
		}

		return items;
	},
};
