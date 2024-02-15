<script>
	import { loading } from '$lib/stores/loading';
</script>

{#if $loading}
	<div class="overlay"></div>
	<img src="/images/logo.png" alt="Logo" class="spinner" />
{/if}

<style>
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.6);
		z-index: 49;
	}

	.spinner {
		--size: 100px;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: var(--size);
		height: var(--size);
		animation: spinLoader 0.9s cubic-bezier(0.5, 0, 0.5, 1) infinite; /* Adjust duration and steps as needed */
		z-index: 1000;
	}

	@keyframes spinLoader {
		0% {
			transform: translate(-50%, -50%) rotate(0deg);
		}
		100% {
			transform: translate(-50%, -50%) rotate(360deg);
		}
	}
</style>
