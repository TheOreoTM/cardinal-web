<script lang="ts">
	import '../app.postcss';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import {
		AppShell,
		Drawer,
		Modal,
		Toast,
		getDrawerStore,
		initializeStores,
		storeHighlightJs
	} from '@skeletonlabs/skeleton';
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
	import {
		computePosition,
		autoUpdate,
		flip,
		shift,
		offset,
		arrow
	} from '@floating-ui/dom';
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
	import HamburgerMenu from '$components/drawers/HamburgerMenu.svelte';

	function matchPathWhitelist(pageUrlPath: string): boolean {
		// If homepage route
		if (pageUrlPath === '/') return true;
		// If legal page
		if (['/privacy', '/terms', '/manage'].includes(pageUrlPath)) return true;

		return false;
	}

	export let data;

	const drawerStore = getDrawerStore();

	$: slotSidebarLeft = matchPathWhitelist($page.url.pathname)
		? 'w-0'
		: 'bg-surface-50-900-token lg:w-auto';
	$: guild = $page.data.guild;
	$: user = data.user;
</script>

<Drawer>
	{#if $drawerStore.id === 'hamburger-menu'}
		<HamburgerMenu />
	{:else}
		<div class="p-4">
			<p class="text-center">Ummm how did you get here...</p>
		</div>
	{/if}
</Drawer>
<Modal />
<Toast />

<AppShell {slotSidebarLeft} slotFooter="bg-black p-4">
	<!-- Header -->
	<svelte:fragment slot="header">
		<MainAppBar bind:user />
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
