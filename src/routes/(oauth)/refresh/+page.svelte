<script lang="ts">
	import Redirect from '$lib/components/Redirect.svelte';
	import { PathNames } from '$lib/constants.js';

	export let data;
</script>

{#if !data.loggedIn}
	<Redirect pageName="Home" to={PathNames.Home} delay={5}>
		<h1 class="h1">Something went wrong. Please try again.</h1>
		<p class="pt-2 text-center text-lg">
			Error: <span class="text-error">{data.error}</span>
		</p>
	</Redirect>
{:else}
	<Redirect pageName="Home" delay={5} to={PathNames.Home}>
		<h1 class="h1">You have been logged in.</h1>
	</Redirect>
{/if}
