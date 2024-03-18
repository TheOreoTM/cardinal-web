<script lang="ts">
	import { PathNames } from '$lib/constants';
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	const drawer = getDrawerStore();
</script>

<div class="h-full bg-surface-50-900-token border-r border-surface-500/30">
	<section class="p-4 space-y-4 overflow-y-auto">
		<div class="container p-2 mx-auto flex flex-col space-y-1">
			<a
				href={PathNames.Manage}
				on:click={() => {
					drawer.close();
				}}
				class="btn variant-ghost-primary"
			>
				<i class="fa-solid fa-cog" />
				<span class="ml-2">Dashboard</span>
			</a>
			<a
				href={PathNames.Docs}
				target="_blank"
				on:click={() => {
					drawer.close();
				}}
				rel="noopener noreferrer"
				class="btn variant-ringed-surface"
			>
				<i class="fa-solid fa-book" />
				<span class="ml-2">Docs</span>
			</a>
			<a
				href={PathNames.Discord}
				target="_blank"
				on:click={() => {
					drawer.close();
				}}
				rel="noopener noreferrer"
				class="btn variant-ringed-surface"
			>
				<i class="fa-brands fa-discord" />
				<span class="ml-2">Support</span>
			</a>
			<a
				href={PathNames.Invite}
				target="_blank"
				on:click={() => {
					drawer.close();
				}}
				rel="noopener noreferrer"
				class="btn variant-ringed-surface"
			>
				<i class="fa-solid fa-plus" />
				<span class="ml-2">Add Bot</span>
			</a>
			<a
				on:click={() => {
					drawer.close();
				}}
				rel="noopener noreferrer"
				class="btn variant-ringed-surface"
				href={PathNames.Appeals}
			>
				<i class="fa-solid fa-note-sticky"></i>
				<span class="">Appeals</span>
			</a>
			<a
				href={PathNames.Logout}
				rel="noopener noreferrer"
				on:click={() => {
					drawer.close();
				}}
				class="btn variant-ghost-error"
			>
				<i class="fa-solid fa-arrow-right-from-bracket" />
				<span class="ml-2">Logout</span>
			</a>
		</div>
	</section>
</div>
