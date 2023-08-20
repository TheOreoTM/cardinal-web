import Shell from '@/components/Shell';
import { Heading } from '@/components/ui/Heading';
import { Textarea } from '@/components/ui/TextArea';

export default function Logging({ params }: { params: { guildId: string } }) {
	return (
		<Shell layout='dashboard'>
			<Heading
				centered={false}
				description='Change the logging settings of the server'
				title={`Logging settings for ${params.guildId}`}
			/>
			<Textarea
				rows={1}
				className='w-full p-2 border resize-none'
				placeholder='Type your stuff here'
			/>
		</Shell>
	);
}
