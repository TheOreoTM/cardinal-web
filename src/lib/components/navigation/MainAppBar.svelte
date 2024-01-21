<script lang="ts">
	import { PathNames } from '$lib/constants';
	import { AppBar, Avatar, type DrawerSettings } from '@skeletonlabs/skeleton';

	// Stores
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	const drawerStore = getDrawerStore();

	// Drawer Handler
	function drawerOpen(): void {
		drawerStore.open();
	}
</script>

<AppBar shadow="shadow-2xl" slotTrail="!space-x-2">
	<svelte:fragment slot="lead">
		<div class="flex items-center space-x-4">
			<!-- Hamburger Menu -->
			<button on:click={drawerOpen} class="btn-icon btn-icon-sm lg:!hidden">
				<i class="fa-solid fa-bars text-xl" />
			</button>
			<!-- Logo -->
			<a class="lg:!ml-0 w-[32px] lg:w-auto" href="/" title="Go to Homepage">
				<Avatar src="/images/logo.png" width="lg:w-12 w-10" alt="cardinal logo" />
			</a>
			<p class="lg:!block hidden font-bold uppercase">Cardinal Bot</p>
		</div>
	</svelte:fragment>

	<svelte:fragment slot="trail">
		<a
			href={PathNames.Docs}
			target="_blank"
			rel="noopener noreferrer"
			class="btn variant-ghost-primary"
		>
			<i class="fa-solid fa-book" />
			<span class="ml-2">Docs</span>
		</a>
		<a
			href={PathNames.Discord}
			target="_blank"
			rel="noopener noreferrer"
			class="btn variant-ghost-primary"
		>
			<i class="fa-brands fa-discord" />
			<span class="ml-2">Support</span>
		</a>
		<a
			href={PathNames.Invite}
			target="_blank"
			rel="noopener noreferrer"
			class="btn variant-ghost-primary"
		>
			<i class="fa-solid fa-plus" />
			<span class="ml-2">Add Bot</span>
		</a>
		<a href={PathNames.Login} rel="noopener noreferrer" class="btn variant-filled-primary">
			<i class="fa-solid fa-right-to-bracket"></i>
			<span class="ml-2">Login</span>
		</a>
	</svelte:fragment>
</AppBar>
