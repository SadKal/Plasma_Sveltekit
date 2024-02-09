<script>
	import { Progressbar } from 'flowbite-svelte';
	import GameFromSeries from './GameFromSeries.svelte';
	import GameShopTextField from './GameShopTextField.svelte';

	export let game;
	export let gamesFromSeries;

	let genres = [];
	let localizations = [];
	if (game.genres) {
		game.genres.forEach((genre) => {
			genres.push(genre.name);
		});
	}
	console.log(game);
	if (game.game_localizations) {
		game.game_localizations.forEach((loc) => {
			localizations.push(loc.name);
		});
	}
</script>

<div class="shopGame__content_container">
	<div class="shopGame__gameInfo">
		<div class="shopGame__main">
			{#if game.game_localizations}
				<GameShopTextField title="Títulos internacionales:" content={localizations} />
			{/if}
			{#if game.summary}
				<GameShopTextField title="Descripción:" content={game.summary} />
			{/if}
			{#if game.storyline}
				<GameShopTextField title="Sinopsis:" content={game.storyline} />
			{/if}
		</div>

		<div class="shopGame__secondary">
			<div class="shopGame__rating">
				{#if game.total_rating != undefined}
					<GameShopTextField
						title="Valoración:"
						content={Math.round(game.total_rating)}
						font_size="1.5rem"
					/>
					<Progressbar progress={game.total_rating} color="primary" size="h-5" />
				{:else}
					<GameShopTextField title="Este juego no tiene valoración" />
				{/if}
			</div>

			<div class="shopGame__genres">
				<GameShopTextField title="Géneros:" content={genres} />
			</div>

			{#if gamesFromSeries.length > 0}
				<div class="shopGame__series">
					<GameShopTextField title="Saga:" content={game.collections[0].name} />

					<div class="shopGame__seriesGames">
						{#each gamesFromSeries as gameFromSeries (gameFromSeries.id)}
							<GameFromSeries game={gameFromSeries} />
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	* {
		animation-name: fadein;
		animation-duration: var(--seconds-fadein);
		animation-timing-function: ease-in;
	}

	.shopGame__content_container {
		width: 100%;
		background: linear-gradient(130deg, rgba(0, 61, 53, 0.95) 40%, rgba(0, 0, 0, 0.95) 100%),
			url('/bg.png');
		background-attachment: fixed;
		z-index: 10;
		position: relative;
		margin-top: -1rem;
		margin-bottom: 10rem;
	}
	.shopGame__gameInfo {
		width: 90%;
		margin: 0 auto;
		padding-top: 2rem;
		display: flex;
		justify-content: space-between;
		@media (max-width: 750px) {
			display: block;
		}
	}
	.shopGame__main {
		display: flex;
		flex-direction: column;
		width: 70%;
		border-right: 3px solid var(--game-data-bg-color);
		padding-right: 7.5%;
		margin-right: 2rem;
		gap: 1.5rem;
		@media (max-width: 750px) and (orientation: portrait) {
			width: 100%;
			border-right: none;
		}
	}
	.shopGame__secondary {
		justify-content: space-between;
		display: flex;
		gap: 1.5rem;
		flex-direction: column;
		text-align: end;
		width: 30%;

		@media (max-width: 750px) {
			text-align: start;
			justify-content: start;
			width: 100%;
			border-right: none;
		}

		& h1 {
			font-size: 1.5rem;
		}
	}
	.shopGame__rating {
		color: var(--subtitle-text-color);
	}
	.shopGame__seriesGames {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		height: 20rem;
		overflow-y: scroll;
	}
</style>
