<script lang="ts">
	import { goto } from '$app/navigation';
	import { navigating, page } from '$app/stores';
	import { PathNames } from '$lib/constants';
	import { loading } from '$lib/stores/loading';
	import { cutText, getGuildAvatarUrl, getUserAvatarUrl } from '$lib/utils/common';
	import { AppBar, Avatar, getModalStore, popup, type PopupSettings } from '@skeletonlabs/skeleton';

	// Stores
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import type { APIGuild, APIUser } from 'discord-api-types/v10';
	const drawerStore = getDrawerStore();
	const modalStore = getModalStore();

	// Drawer Handler
	function hamburgerMenuOpen(): void {
		drawerStore.open({
			id: 'hamburger-menu',
			bgDrawer: 'bg-surface-900 text-white',
			bgBackdrop: 'bg-gradient-to-tr from-primary-500/30 via-primary-500/20 to-primary-500/10',
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
				if (r) {
					window.location.href = PathNames.Logout;
				}
			}
		});
	}

	export let user: APIUser | null = null;

	const guildPopup: PopupSettings = {
		event: 'click',
		placement: 'bottom',
		target: 'guilds',
		state: (e: Record<string, boolean>) => {
			if (e.state === true) {
				document.getElementById('guild-arrow')?.classList.remove('rotate-180');
			} else {
				document.getElementById('guild-arrow')?.classList.add('rotate-180');
			}
		}
	};

	const userPopup: PopupSettings = {
		event: 'click',
		placement: 'bottom-end',
		target: 'user',
		state: (e: Record<string, boolean>) => {
			if (e.state === true) {
				document.getElementById('user-arrow')?.classList.remove('rotate-180');
			} else {
				document.getElementById('user-arrow')?.classList.add('rotate-180');
			}
		}
	};

	$: usernameClass = guild ? 'hidden' : 'block';

	$: guildId = $page.params.guildId;
	$: guild = $page.data.guild as APIGuild;

	$: guildAvatar = getGuildAvatarUrl(guildId, guild?.icon);
	$: guildName = guild?.name;

	const guilds = ($page.data?.guilds?.mutual as APIGuild[]) ?? [];
</script>

<nav class="flex items-center justify-between p-2 bg-surface-800">
	<!-- Hamburger -->
	<div class="flex flex-row gap-4 items-center">
		<button class="md:hidden">
			<i class="fa-solid fa-bars text-2xl"></i>
		</button>
		<!-- Logo -->
		<div>
			<button class="flex items-center btn p-0" on:click={() => goto('/')} title="Go to Homepage">
				<Avatar class="mr-2 md:mr-0" src="/images/logo.png" width="lg:w-12 w-10" alt="cardinal logo" />
				<p class="md:!block hidden font-bold text-2xl ml-2">Cardinal</p>
			</button>
		</div>
	</div>

	<!-- Guild -->
	{#if guild}
		<button
			use:popup={guildPopup}
			class="md:ml-6 md:mx-auto py-0.5 px-2 btn min-w-0 min-h-9 variant-ghost rounded-full"
		>
			<div class="btn-icon btn-icon-sm">
				<Avatar width="w-6" initials={guildName[0]} src={guildAvatar} />
			</div>
			<span class="overflow-hidden overflow-ellipsis">{cutText(guildName, 20, false)}</span>
			<span class="badge-icon">
				<i id="guild-arrow" class="fa-solid fa-angle-up text-base rotate-180 transition duration-300"></i>
			</span>
		</button>

		<!-- popup -->
		<div class="card p-1 w-60 shadow-xl overflow-y-auto max-h-96" data-popup="guilds">
			<nav class="list-nav">
				<ul>
					{#each guilds as guild (guild.id)}
						<li>
							<a class="w-full hover:!variant-ghost variant-ringed" href={`${PathNames.Manage}/${guild.id}`}>
								<span>{cutText(guild.name, 18, false)}</span>
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</div>
	{/if}

	<!-- User & Links-->
	<div class="flex flex-row space-x-2 items-center">
		<!-- Links -->
		{#if !guild}
			<!-- Legal -->
			<div class="relative hidden sm:block">
				<!-- trigger -->
				<button class="btn hover:variant-soft-primary" use:popup={{ event: 'click', target: 'legal' }}>
					<span>Legal</span>
					<i class="fa-solid fa-caret-down opacity-50" />
				</button>
				<!-- popup -->
				<div class="card p-4 w-60 shadow-xl" data-popup="legal">
					<nav class="list-nav">
						<ul>
							<li>
								<a href={PathNames.Terms}>
									<i class="fa-solid fa-globe"></i>
									<span class="">Terms of Service</span>
								</a>
							</li>
							<li>
								<a href={PathNames.Privacy}>
									<i class="fa-solid fa-globe"></i>
									<span class="">Privacy Policy</span>
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>
			<!-- Info -->
			<div class="relative hidden sm:block">
				<!-- trigger -->
				<button class="btn hover:variant-soft-primary" use:popup={{ event: 'click', target: 'info' }}>
					<span>Info</span>
					<i class="fa-solid fa-caret-down opacity-50" />
				</button>
				<!-- popup -->
				<div class="card p-4 w-60 shadow-xl" data-popup="info">
					<nav class="list-nav">
						<ul>
							<li>
								<a href={PathNames.Docs}>
									<i class="fa-solid fa-book" />
									<span class="">Docs</span>
								</a>
							</li>
							<li>
								<a href={PathNames.Commands}>
									<i class="fa-solid fa-list" />
									<span class="">Commands</span>
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>
			<!-- Links -->
			<div class="relative hidden sm:block">
				<!-- trigger -->
				<button class="btn hover:variant-soft-primary" use:popup={{ event: 'click', target: 'links' }}>
					<span>Links</span>
					<i class="fa-solid fa-caret-down opacity-50" />
				</button>
				<div class="card p-4 w-60 shadow-xl" data-popup="links">
					<nav class="list-nav">
						<ul>
							<li>
								<a href={PathNames.Discord} target="_blank">
									<i class="fa-brands fa-discord" />
									<span class="">Support Server</span>
								</a>
							</li>
							<li>
								<a href={PathNames.Invite} target="_blank">
									<i class="fa-solid fa-plus" />
									<span class="">Add Bot</span>
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		{/if}
		<!-- User -->
		{#if user}
			<button class="py-1 px-2 flex items-center btn hover:variant-ghost rounded-full" use:popup={userPopup}>
				<Avatar width="w-8" initials={user.username[0]} src={getUserAvatarUrl(user.id, user.avatar)} />
				<span class={`font-semibold text-lg ${usernameClass} md:block`}>{user.global_name}</span>
				<span class={`${usernameClass} badge-icon md:block flex items-center`}>
					<i id="user-arrow" class="fa-solid fa-angle-up text-base rotate-180 transition duration-300"></i>
				</span>
			</button>
			<div class="card p-1 w-60 shadow-xl" data-popup="user">
				<nav class="list-nav">
					<ul>
						<li>
							<a href={PathNames.Appeals}>
								<i class="fa-solid fa-note-sticky"></i>
								<span class="">Appeals</span>
							</a>
						</li>
						<li>
							<a href={PathNames.Manage}>
								<i class="fa-solid fa-server"></i>
								<span class="">Servers</span>
							</a>
						</li>
						<li>
							<a href={PathNames.Logout}>
								<i class="fa-solid fa-right-to-bracket"></i>
								<span class="">Logout</span>
							</a>
						</li>
					</ul>
				</nav>
			</div>
		{:else}
			<a href={PathNames.Login} rel="noopener noreferrer" class="btn variant-filled-primary">
				<i class="fa-solid fa-right-to-bracket"></i>
				<span class="ml-2">Login</span>
			</a>
		{/if}
	</div>
</nav>

<style lang="postcss">
	.line-hamburger {
		width: 100%;
		height: 20px;
		background: #ffffff;
		border-radius: 10px;
		opacity: 0.9;
		transition: all 0.2s ease;
	}

	.burger-menu {
		position: absolute;
		display: none;
		flex-direction: column;
		gap: 5px;
		left: 10px;
		width: 23px;
	}
</style>
