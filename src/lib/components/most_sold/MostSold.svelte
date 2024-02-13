<script>
	import MostSoldGame from './MostSoldGame.svelte';

	export let mostSold;
</script>

<div class="most-sold">
	<div class="most-sold__title">Mejor valorados</div>
	<div class="most-sold__subtitle">Juegos con las valoraciones mas altas en los ultimos años</div>
	<div class="most-sold__exhibitor">
		{#each mostSold as game, index}
			<MostSoldGame {game} {index} />
		{/each}
	</div>
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
			grid-template-columns: 20% 20% 20%;
			justify-content: center;
			grid-gap: 5vw;
			margin-top: 4rem;
		}
	}
</style>
