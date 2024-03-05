<script>
	import MostSoldGame from './MostSoldGame.svelte';
	import { Pulse } from 'svelte-loading-spinners';

	export let mostSold;

	let offset = mostSold.length;

	let loading;
	let noMore = false;
	async function fetchMoreMostSold() {
		try {
			loading = true;
			const response = await fetch(`/api?type=mostSold&q=${offset}`, {
				method: 'GET',
				headers: {
					'content-type': 'application/json'
				}
			});
			const newMostSold = await response.json();
			mostSold = [...mostSold, ...newMostSold];
			noMore = newMostSold.length < 4 ? true : false;
			offset = mostSold.length;
			loading = false;
			window.scrollTo({
				top: window.scrollY + 600,
				behavior: 'smooth'
			});
		} catch (error) {
			console.error('Error updating data:', error.message);
		}
	}
</script>

<div class="most-sold">
	<div class="most-sold__title">Mejor valorados</div>
	<div class="most-sold__subtitle">Juegos con las valoraciones mas altas en los ultimos años</div>
	<div class="most-sold__exhibitor">
		{#each mostSold as game, index}
			<MostSoldGame {game} {index} />
		{/each}
	</div>
	{#if !noMore}
		<div class="most-sold__load" on:click={fetchMoreMostSold}>
			{#if loading}
				<Pulse color="#d13364" duration=".5s" size="100" />
			{:else}
				<p>Cargar más</p>
			{/if}
		</div>
	{/if}
</div>

<style lang="scss">
	.most-sold {
		width: 100%;
		text-align: center;
		margin-top: 5rem;

		animation: fadein var(--seconds-fadein) ease-in;

		@media (max-width: 450px) {
			margin-top: 4rem;
		}

		&__title {
			color: var(--text-color);
			font-size: 6rem;
			margin-top: 7rem;
			font-weight: 400;
			letter-spacing: 0.2rem;
		}
		&__subtitle {
			color: var(--subtitle-text-color);
			font-size: 1.25rem;
		}

		&__exhibitor {
			display: grid;
			grid-template-columns: repeat(auto-fit, 20rem);
			justify-content: center;
			grid-gap: 5vw;
			margin-top: 4rem;
		}

		&__load {
			display: flex;
			justify-content: center;
			margin-top: 2rem;
			height: 3rem;

			& p {
				padding: 1rem;

				color: var(--text-color);
				font-size: 2rem;
				font-weight: 600;
				background-color: var(--topbar-background-color);
				cursor: pointer;

				transition: all 0.3s;
				&:hover {
					background-color: var(--cart-total-bg-color);
					transform: scale(1.1);
				}
			}
		}
	}
</style>
