<script lang="ts">
	import Meta from '$components/Meta.svelte';
	import type { FlattenedCommand } from '$lib/types';
	import { marked } from 'marked';
	import type { PageData } from './$types';
	import { Accordion, AccordionItem, Tab, TabGroup } from '@skeletonlabs/skeleton';

	export let data: PageData;
	const commands = data.commands;

	const filteredCommands: Array<{
		category: string;
		commands: Array<FlattenedCommand>;
	}> = Object.entries(
		commands.reduce(
			(acc, command) => {
				const category = command.category;

				// Ensure the category array exists in the accumulator, with a default value of an empty array
				acc[category] = (acc[category] || []).concat(command);

				return acc;
			},
			{} as Record<string, FlattenedCommand[]>
		)
	).map(([category, commands]) => ({ category, commands }));

	let tabSet = 0;
</script>

<Meta title="Commands" />

<TabGroup justify="justify-center">
	{#each filteredCommands as { category }, i}
		<Tab bind:group={tabSet} name={category} value={i}>
			{category}
		</Tab>
	{/each}
	<svelte:fragment slot="panel">
		<Accordion class="card p-4 text-token" spacing="space-y-2" regionPanel="bg-surface-900 pb-5">
			{#each filteredCommands[tabSet].commands as command}
				<AccordionItem open={false}>
					<svelte:fragment slot="summary">
						<span>
							<span class="font-bold">
								{command.detailedDescription.prefix}{command.name}
							</span>
							- {command.description}
						</span>
					</svelte:fragment>
					<svelte:fragment slot="content">
						<div class="grid grid-cols-1 space-y-2">
							<span
								>{@html marked(
									command.detailedDescription.extendedHelp ??
										"Seems like i didnt write a help command for this. You're on your own bud"
								)}</span
							>
							{#if command.detailedDescription.usages}
								<span
									><p class="font-bold text-lg">Usage:</p>
									{#each command.detailedDescription.usages as usage}
										<code class="code"
											>{command.detailedDescription.prefix}{command.name}
											{usage}
										</code>
										<br />
									{/each}
								</span>
								<hr class="!my-3 opacity-50" />
							{/if}
							{#if command.detailedDescription.explainedUsage}
								<span
									><p class="font-bold text-lg">Explained Usage:</p>
									{#each command.detailedDescription.explainedUsage as eusage}
										<div class="flex flex-row space-x-1 text-sm">
											<span class="font-semibold">{eusage[0]}: </span>
											{@html marked(eusage[1])}
										</div>
									{/each}
								</span>
								<hr class="!my-3 opacity-50" />
							{/if}
							{#if command.detailedDescription.examples}
								<span
									><p class="font-bold text-lg">Example:</p>
									{#each command.detailedDescription.examples as example}
										<code class="code"
											>{command.detailedDescription.prefix}{command.name}
											{example}
										</code>
										<br />
									{/each}
								</span>
							{/if}
						</div>
					</svelte:fragment>
				</AccordionItem>
			{/each}
		</Accordion>
	</svelte:fragment>
</TabGroup>
