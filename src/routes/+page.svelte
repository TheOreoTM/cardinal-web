<script lang="ts">
	import Meta from '$components/Meta.svelte';
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
