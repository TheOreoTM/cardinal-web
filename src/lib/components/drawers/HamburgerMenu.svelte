<script>
	import { PathNames } from '$lib/constants';
</script>

<div class="h-full bg-surface-50-900-token border-r border-surface-500/30">
	<section class="p-4 space-y-4 overflow-y-auto">
		<div class="container p-2 mx-auto flex flex-col space-y-1">
			<a
				href={PathNames.Docs}
				target="_blank"
				rel="noopener noreferrer"
				class="btn variant-ringed-surface"
			>
				<i class="fa-solid fa-book" />
				<span class="ml-2">Docs</span>
			</a>
			<a
				href={PathNames.Discord}
				target="_blank"
				rel="noopener noreferrer"
				class="btn variant-ringed-surface"
			>
				<i class="fa-brands fa-discord" />
				<span class="ml-2">Support</span>
			</a>
			<a
				href={PathNames.Invite}
				target="_blank"
				rel="noopener noreferrer"
				class="btn variant-ringed-surface"
			>
				<i class="fa-solid fa-plus" />
				<span class="ml-2">Add Bot</span>
			</a>
			<a
				href={PathNames.Logout}
				rel="noopener noreferrer"
				class="btn variant-ghost-error"
			>
				<i class="fa-solid fa-arrow-right-from-bracket" />
				<span class="ml-2">Logout</span>
			</a>
		</div>
	</section>
</div>
