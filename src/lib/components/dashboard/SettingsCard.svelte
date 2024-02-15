<script lang="ts">
	import {
		popup,
		type CssClasses,
		type PopupSettings
	} from '@skeletonlabs/skeleton';

	export let title: string;
	export let documentation: string | null = null;
	export let badgeText: string | null = null;
	export let badgeColor: CssClasses = 'variant-filled-primary';

	const popupHover: PopupSettings = {
		event: 'hover',
		target: 'popupHover',
		placement: 'top'
	};
</script>

<div class="card flex flex-col shadow-md w-full justify-between">
	<div>
		<header class="card-header flex items-center gap-2 text-2xl mb-2">
			<div class="flex flex-row space-x-2">
				<span>{title}</span>
				{#if badgeText}
					<span class={`badge text-xs rounded-full ${badgeColor}`}
						>{badgeText}</span
					>
				{/if}
			</div>
			{#if documentation}
				<button
					type="button"
					class="badge-icon variant-filled cursor-pointer [&>*]:pointer-events-none !rounded-full"
					use:popup={popupHover}
				>
					<span><i class="fa-solid fa-question text-base" /></span>
				</button>
				<div class="card p-4 variant-filled-surface" data-popup="popupHover">
					<p class="text-sm">{documentation}</p>
					<div class="arrow variant-filled-surface" />
				</div>
			{/if}
		</header>
		<hr class="w-[96%] mx-auto" />
		<div class="p-4 space-y-4">
			<slot />
		</div>
	</div>
</div>
