import Shell from '@/components/Shell';
import { Heading } from '@/components/ui/Heading';

export default function Settings() {
	return (
		<Shell layout='dashboard'>
			<Heading
				centered={false}
				description='View the list of commands available for the bot'
				title='Commands'
			/>
		</Shell>
	);
}
