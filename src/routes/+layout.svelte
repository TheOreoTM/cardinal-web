<script lang="ts">
	import '../app.postcss';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { AppBar, AppShell, Drawer, Modal, Toast, initializeStores, storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import MainAppBar from '$lib/components/navigation/MainAppBar.svelte';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	initializeStores();

	// Font Awesome
	import '@fortawesome/fontawesome-free/css/fontawesome.css';
	import '@fortawesome/fontawesome-free/css/brands.css';
	import '@fortawesome/fontawesome-free/css/solid.css';
	import GuildSideBar from '$components/navigation/GuildSideBar.svelte';

	function matchPathWhitelist(pageUrlPath: string): boolean {
		// If homepage route
		if (pageUrlPath === '/') return true;
		// If legal page
		if (['/privacy', '/terms', '/manage'].includes(pageUrlPath)) return true;

		return false;
	}

	$: slotSidebarLeft = matchPathWhitelist($page.url.pathname) ? 'w-0' : 'bg-surface-50-900-token lg:w-auto';
	$: guild = $page.data.guild;
</script>

<Drawer />
<Modal />
<Toast />

<AppShell {slotSidebarLeft} slotFooter="bg-black p-4">
	<!-- Header -->
	<svelte:fragment slot="header">
		<MainAppBar />
	</svelte:fragment>

	<!-- Sidebar (Left) -->
	<svelte:fragment slot="sidebarLeft">
		{#if guild}
			<GuildSideBar />
		{/if}
	</svelte:fragment>

	<!-- Page Content -->
	<div class="container p-10 mx-auto">
		<slot />
	</div>

	<!-- Page Footer -->
	<svelte:fragment slot="pageFooter"></svelte:fragment>
</AppShell>
