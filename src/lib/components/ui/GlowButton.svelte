<script lang="ts">
	import { goto } from '$app/navigation';
	import type { CssClasses } from '@skeletonlabs/skeleton';

	export let size: 'btn-xl' | 'btn-lg' | 'btn-md' | 'btn-sm' = 'btn-sm';
	export let bgColor: CssClasses = 'bg-yellow-500';
	export let shadowColor: CssClasses = `shadow-yellow-500`;
	export let href: string | null = null;
</script>

<button
	on:click={() => {
		if (href) {
			goto(href);
		}
	}}
	class={`btn ${size} shadow-[0_0px_30px_0px] ${shadowColor} hover:shadow-2xl hover:${shadowColor}/10 transition-all duration-500 ${bgColor} text-black`}
>
	<slot />
</button>
