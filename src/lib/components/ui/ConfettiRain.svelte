<script>
	import { confetti } from '$lib/stores/confetti';
	import Confetti from 'svelte-confetti';

	$: if ($confetti) {
		setTimeout(() => {
			$confetti = false;
		}, 16000);
	}
</script>

{#if $confetti}
	<div
		class="fixed -top-[2vh] left-0 h-[100vh] w-[100vw] flex justify-center overflow-hidden pointer-events-none"
	>
		<Confetti x={[-5, 5]} y={[0, 0.1]} delay={[0, 8000]} duration={8000} amount={500} fallDistance="100vh" />
	</div>
{/if}
