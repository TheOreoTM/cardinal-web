<script>
	import Redirect from '$lib/components/Redirect.svelte';
	import { PathNames } from '$lib/constants';
</script>

<Redirect
	pageName="Home"
	to={`${PathNames.Home}?message=${encodeURIComponent('Logged out')}`}
	delay={null}
>
	<h1 class="h1">You have been logged out.</h1>
</Redirect>
