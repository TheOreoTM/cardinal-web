<script lang="ts">
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

	export let title: string;
	export let documentation: string | null = null;

	const popupHover: PopupSettings = {
		event: 'hover',
		target: 'popupHover',
		placement: 'top'
	};
</script>

<div class="card flex flex-col shadow-md w-full justify-between">
	<div>
		<header class="card-header flex items-center gap-2 text-2xl mb-2">
			{title}
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
