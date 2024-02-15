<script>
	import { LOADING_MESSAGES } from '$lib/constants';
	import { loading } from '$lib/stores/loading';
	import { getRandomItem } from '$lib/utils/common';
</script>

{#if $loading}
	<div class="overlay">
		<img src="/images/logo.png" alt="Logo" class="spinner" />
		<p class="loading-message">
			<span class="font-bold">Did you know: </span>
			{getRandomItem(LOADING_MESSAGES)}
		</p>
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.6);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		z-index: 49;
	}

	.spinner {
		--size: 100px;
		width: var(--size);
		height: var(--size);
		animation: spinLoader 0.9s cubic-bezier(0.5, 0, 0.5, 1) infinite;
		z-index: 1000;
	}

	.loading-message {
		color: white; /* Adjust text color as needed */
		text-align: center;
		margin-top: 20px; /* Adjust margin as needed */
	}

	@keyframes spinLoader {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
