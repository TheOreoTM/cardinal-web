<script lang="ts">
	import Redirect from '$components/Redirect.svelte';

	export let data;
</script>

<Redirect pageName="Manage" to={data.to} delay={null}>
	<h1 class="h1">Thank you for choosing cardinal</h1>
</Redirect>
