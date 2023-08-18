import {
	Settings,
	FileClock,
	type LucideIcon,
	LogIn,
	LineChart,
	User,
	GanttChartSquare,
	LogOut,
} from 'lucide-react';
import Image from 'next/image';

export type Icon = LucideIcon;

export const Icons = {
	logo: ({
		width,
		height,
	}: {
		width: number | `${number}`;
		height: number | `${number}`;
	}) => (
		<Image
			unoptimized
			src='/logo.png'
			width={width}
			height={height}
			alt='Code Racer Logo'
		/>
	),
	logging: FileClock,
	settings: Settings,
	login: LogIn,
	logout: LogOut,
	lineChart: LineChart,
	profile: User,
	manage: GanttChartSquare,
};
