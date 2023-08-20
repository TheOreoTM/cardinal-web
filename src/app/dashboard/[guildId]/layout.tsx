import { SidebarNav } from '@/components/SidebarNav';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { DashboardConfig } from '@/config/dashboard';
import '../../globals.css';

export default function DashboardLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { guildId: string };
}) {
	const { guildId } = params;
	const items = new DashboardConfig(guildId).sidebarNav();

	return (
		<div className='container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] p-0 md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10'>
			<aside className='fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r border-neutral-700 md:sticky md:block'>
				<ScrollArea className='py-6 pr-6 lg:py-8'>
					<SidebarNav items={items} />
				</ScrollArea>
			</aside>
			<main className='flex w-full flex-col overflow-hidden'>{children}</main>
			<div className='md:hidden'>
				<ScrollArea className='py-6 pr-6 lg:py-8'>
					<SidebarNav items={items} />
				</ScrollArea>
			</div>
		</div>
	);
}
