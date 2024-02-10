<script lang="ts">
	import { page } from '$app/stores';
	import { PathNames } from '$lib/constants';
	import { getGuildAvatarUrl, getUserAvatarUrl } from '$lib/utils/common';
	import { AppBar, Avatar, getModalStore, popup } from '@skeletonlabs/skeleton';

	// Stores
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import type { APIUser } from 'discord-api-types/v10';
	const drawerStore = getDrawerStore();
	const modalStore = getModalStore();

	// Drawer Handler
	function hamburgerMenuOpen(): void {
		drawerStore.open({
			id: 'hamburger-menu',
			bgDrawer: 'bg-surface-900 text-white',
			bgBackdrop:
				'bg-gradient-to-tr from-primary-500/30 via-primary-500/20 to-primary-500/10',
			width: 'w-[280px] md:w-[480px]',
			height: 'h-min',
			padding: 'p-4',
			rounded: 'rounded-xl',
			position: 'left'
		});
	}

	function userMenuOpen(): void {
		modalStore.trigger({
			type: 'confirm',
			title: 'Logout',
			body: 'Are you sure you want to logout?',

			buttonTextCancel: 'Cancel',
			buttonTextConfirm: 'Logout',

			response(r) {
				console.log(r);
				if (r) {
					window.location.href = PathNames.Logout;
				}
			}
		});
	}

	export let user: APIUser | null = null;
</script>

<AppBar shadow="shadow-2xl" slotTrail="!space-x-2">
	<svelte:fragment slot="lead">
		<div class="flex items-center space-x-4">
			<!-- Hamburger Menu -->
			<button
				on:click={hamburgerMenuOpen}
				class="btn-icon btn-icon-sm sm:hidden"
			>
				<i class="fa-solid fa-bars text-xl" />
			</button>
			<!-- Logo -->
			<a class="lg:!ml-0 w-[32px] lg:w-auto" href="/" title="Go to Homepage">
				<Avatar
					src="/images/logo.png"
					width="lg:w-12 w-10"
					alt="cardinal logo"
				/>
			</a>
			<p class="lg:!block hidden font-bold uppercase">Cardinal Bot</p>
		</div>
	</svelte:fragment>

	<svelte:fragment slot="trail">
		<!-- Info -->
		<div class="relative hidden sm:block">
			<!-- trigger -->
			<button
				class="btn hover:variant-soft-primary"
				use:popup={{ event: 'click', target: 'info' }}
			>
				<span>Info</span>
				<i class="fa-solid fa-caret-down opacity-50" />
			</button>
			<!-- popup -->
			<div class="card p-4 w-60 shadow-xl" data-popup="info">
				<nav class="list-nav">
					<ul>
						<li>
							<a href={PathNames.Docs}>
								<!-- <i class="fa-solid fa-book" /> -->
								<span class="">Docs</span>
							</a>
						</li>
						<li>
							<a href={PathNames.Commands}>
								<!-- <i class="fa-solid fa-book" /> -->
								<span class="">Commands</span>
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</div>
		<div class="relative hidden sm:block">
			<a
				href={PathNames.Discord}
				target="_blank"
				rel="noopener noreferrer"
				class="btn variant-ghost-primary"
			>
				<!-- <i class="fa-brands fa-discord" /> -->
				<span class="">Support</span>
			</a>
			<a
				href={PathNames.Invite}
				target="_blank"
				rel="noopener noreferrer"
				class="btn variant-ghost-primary"
			>
				<!-- <i class="fa-solid fa-plus" /> -->
				<span class="">Invite</span>
			</a>
			{#if user}
				<a href={PathNames.Manage} class="btn variant-ghost-primary">
					<!-- <i class="fa-solid fa-bars-progress"></i> -->
					<span class="">Manage</span>
				</a>
			{/if}
		</div>
		{#if user}
			<button
				on:click={userMenuOpen}
				class="btn variant-glass-primary space-x-2 rounded-md flex items-center px-2"
			>
				<Avatar
					width="w-6"
					initials={user.username[0]}
					src={getUserAvatarUrl(user.id, user.avatar)}
				/>
				<span class="badge rounded-md variant-filled-primary"
					>@{user.username}</span
				>
			</button>
		{:else}
			<a
				href={PathNames.Login}
				rel="noopener noreferrer"
				class="btn variant-filled-primary"
			>
				<i class="fa-solid fa-right-to-bracket"></i>
				<span class="ml-2">Login</span>
			</a>
		{/if}
	</svelte:fragment>
</AppBar>
