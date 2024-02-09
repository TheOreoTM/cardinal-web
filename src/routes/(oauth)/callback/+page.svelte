<script lang="ts">
	import { goto } from '$app/navigation';
	import Redirect from '$lib/components/Redirect.svelte';
	import { PathNames } from '$lib/constants.js';

	export let data;
</script>

{#if !data.loggedIn}
	<Redirect
		pageName="Home"
		to={`${PathNames.Home}?error=${encodeURIComponent(data.error ?? 'Unknown error')}`}
		delay={null}
	>
		<h1 class="h1">Something went wrong. Please try again.</h1>
		<p class="pt-2 text-center text-lg">
			Error: <span class="text-error">{data.error}</span>
		</p>
	</Redirect>
{:else}
	<Redirect
		pageName="Manage"
		delay={null}
		to={`${PathNames.Home}?message=${encodeURIComponent('Logged in successfully')}`}
	>
		<h1 class="h1">You have been logged in.</h1>
	</Redirect>
{/if}
