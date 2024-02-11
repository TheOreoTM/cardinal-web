<script lang="ts">
	import Meta from '$components/Meta.svelte';
	import GlowButton from '$components/ui/GlowButton.svelte';
	import ZPattern from '$components/ui/ZPattern.svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	export let data;

	onMount(() => {
		if (data.error) {
			toastStore.trigger({
				message: 'Failed to log in. Please try again.',
				hideDismiss: true,
				timeout: 8000,
				background: 'variant-filled-warning'
			});
			toastStore.trigger({
				message: `Error: ${data.error}`,
				hideDismiss: true,
				timeout: 8000,
				background: 'variant-filled-warning'
			});
		}

		if (data.message) {
			toastStore.trigger({
				message: data.message,
				timeout: 8000,
				background: 'variant-filled-primary'
			});
		}
	});

	const toastStore = getToastStore();
</script>

<Meta title="Home" />

<div class="flex flex-col items-center space-y-10">
	<div class="uppercase font-bold text-center">
		<h1 class="h1">
			<span class="gradient-header">Cardinal Bot</span>
		</h1>
		<hr class="opacity-60 !mb-10 !mt-2 mx-auto w-[40%]" />
	</div>
	Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit temporibus
	atque perspiciatis culpa saepe corrupti nisi, velit quos nostrum harum accusamus
	amet quaerat dolore eligendi itaque autem cumque dolorem. Nobis!
	<div class="flex flex-row space-x-4">
		<GlowButton size="btn-xl">Invite to Server</GlowButton>
		<div class="hidden sm:block">
			<GlowButton
				size="btn-xl"
				bgColor="bg-primary-500"
				shadowColor="shadow-primary-500">Dashboard</GlowButton
			>
		</div>
	</div>
</div>
<div class="flex flex-col my-20 gap-y-20">
	<ZPattern isOdd>
		<svelte:fragment slot="header">
			<span class="highlight font-bold">Track</span> Stats Easily
		</svelte:fragment>
		<svelte:fragment slot="body">
			Cardinal can track the number of messages sent for a user, role, or in a
			channel and display detailed statistics. Users have the flexibility to
			customize the time range for these stats, offering a tailored analysis of
			message activity within the specified period.
		</svelte:fragment>
		<svelte:fragment slot="preview">
			<img
				src="https://mtek3d.com/wp-content/uploads/2018/01/image-placeholder-500x500.jpg"
				width="283"
				height="283"
				alt=""
				class="order-1 md:order-2 md:ml-auto"
			/>
		</svelte:fragment>
	</ZPattern>

	<ZPattern>
		<svelte:fragment slot="header">
			<span class="highlight font-bold">Lorem</span> Ipsum Dolor
		</svelte:fragment>
		<svelte:fragment slot="body">
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam dolor,
			nemo repellendus atque consectetur adipisci officiis rerum cupiditate
			iusto perspiciatis ratione eveniet, est recusandae voluptas veritatis ea
			at quam! Asperiores?
		</svelte:fragment>
		<svelte:fragment slot="preview">
			<img
				src="https://mtek3d.com/wp-content/uploads/2018/01/image-placeholder-500x500.jpg"
				width="283"
				height="283"
				alt=""
				class="md:ml-auto"
			/>
		</svelte:fragment>
	</ZPattern>
</div>

<style lang="postcss">
	.highlight {
		@apply bg-gradient-to-br from-yellow-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone;
	}

	.gradient-header {
		@apply bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone;
	}
</style>
