<script lang="ts">
	import Meta from '$components/Meta.svelte';
	import Heading from '$components/ui/Heading.svelte';
	import { getGuildAvatarUrl } from '$lib/utils/common';
	import { SlideToggle, Step, Stepper } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { getExtendedToastStore } from '$lib/utils/toast';
	import SelectOneRole from '$components/dashboard/SelectOneRole.svelte';
	import Label from '$components/forms/Label.svelte';

	export let data: PageData;

	let locked = true;

	function onNextHandler(e: CustomEvent): void {
		console.log('event:next', e.detail);
	}
	function onBackHandler(e: CustomEvent): void {
		console.log('event:prev', e.detail);
	}
	function onStepHandler(e: CustomEvent): void {
		console.log('event:step', e.detail);
	}
	function onCompleteHandler(e: CustomEvent): void {
		console.log('event:complete', e.detail);
		alert('Complete!');
	}

	const toast = getExtendedToastStore();

	function warnPrefix() {
		toast.clear();
		toast.error('Provide a valid prefix between 1 and 10 characters');
	}

	function isValidPrefix(prefix: string) {
		return prefix.length >= 1 && prefix.length <= 10;
	}

	function handlePrefixInput(event: Event) {
		if (!(event.target instanceof HTMLInputElement)) return;
		let prefix = event.target.value;

		const valid = isValidPrefix(prefix);

		if (valid) {
			values.prefix = prefix;
		} else {
			values.prefix = values.prefix.slice(0, 10);
			warnPrefix();
		}
	}

	let values = {
		prefix: '>',
		lookback: 7,
		premium: false,
		roleTrainee: '',
		roleStaff: '',
		roleModerator: '',
		roleAdmin: '',
		roleMuted: ''
	};
</script>

<Meta
	title="Setup Guild"
	logo={getGuildAvatarUrl(data.guild.id, data.guild.icon)}
	guildName={data.guild.name}
/>

<Heading title="Lets get you started" centered />

<div class="w-full card p-4 text-token">
	<Stepper
		on:next={onNextHandler}
		on:back={onBackHandler}
		on:step={onStepHandler}
		on:complete={onCompleteHandler}
	>
		<Step>
			<svelte:fragment slot="header">Get Started!</svelte:fragment>
			<p>
				Lets help you setup the basic setting for <span class="font-bold">{data.guild.name}</span>
			</p>
			<svelte:fragment slot="navigation"
				><button on:click={() => {}} class="btn variant-ghost">Skip</button></svelte:fragment
			>
		</Step>
		<Step>
			<svelte:fragment slot="header">Prefix</svelte:fragment>
			<p>What prefix should the bot respond to?</p>
			<input
				class="input"
				type="text"
				placeholder=">"
				id="prefix"
				bind:value={values.prefix}
				on:input={handlePrefixInput}
				min="1"
				max="10"
			/>
		</Step>
		<Step>
			<svelte:fragment slot="header">Admin</svelte:fragment>
			<p>What role should cardinal consider as the admin role?</p>
			<!-- this makes the thing not show up -->
			<SelectOneRole roles={data.roles} selected={values.roleAdmin} />
		</Step>
		<Step>
			<svelte:fragment slot="header">Long Form Content.</svelte:fragment>
			<p>The steps will expand to fit content of any length.</p>
			<p>
				<!-- cspell:disable -->
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque vel expedita porro vero, saepe dicta repellendus
				facilis ab accusamus unde, tempora ut nobis eum. Veniam, architecto corrupti. Lorem ipsum dolor sit amet
				consectetur adipisicing elit. Itaque vel expedita porro vero, saepe dicta repellendus facilis ab accusamus
				unde, tempora ut nobis eum. Veniam, architecto corrupti. Lorem ipsum dolor sit amet consectetur adipisicing
				elit. Itaque vel expedita porro vero, saepe dicta repellendus facilis ab accusamus unde, tempora ut nobis
				eum. Veniam, architecto corrupti. Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque vel expedita
				porro vero, saepe dicta repellendus facilis ab accusamus unde, tempora ut nobis eum. Veniam, architecto
				corrupti. Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque vel expedita porro vero, saepe
				dicta repellendus facilis ab accusamus unde, tempora ut nobis eum. Veniam, architecto corrupti.
				<!-- cspell:enable -->
			</p>
		</Step>
		<Step>
			<svelte:fragment slot="header">Almost Done.</svelte:fragment>
			<p>
				A Complete button will appear on the last step. When the step is unlocked and the button pressed, an <code
					class="code">on:complete</code
				> event will be fired. You can use this trigger to submit form data to a server.
			</p>
		</Step>
	</Stepper>
</div>
