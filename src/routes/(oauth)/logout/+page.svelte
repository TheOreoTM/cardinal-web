<script>
	import Redirect from '$lib/components/Redirect.svelte';
	import { PathNames } from '$lib/constants';
</script>

<Redirect pageName="Home" to={PathNames.Home} delay={8}>
	<h1 class="h1">You have been logged out.</h1>
</Redirect>
