<script>
	import GameShopTextField from '$lib/utils/GameShopTextField.svelte';
	import DLCS from './main/DLCS/DLCS.svelte';
	import Platform from './secondary/Platform.svelte';
	import Trailer from './main/Trailer.svelte';
	import GameSeries from './secondary/GameSeries.svelte';
	import GameRating from './secondary/GameRating.svelte';
	import GameDescription from './main/GameDescription.svelte';

	export let game;
	export let dlcs;
	export let gamesFromSeries;

	let genres = [];

	if (game.genres) {
		game.genres.forEach((genre) => {
			genres.push(genre.name);
		});
	}
</script>

<div class="shopGame__content_container">
	{#if game.category == 1 || game.category == 2}
		<div class="shopGame__isDLC">
			<p>
				Ojo! Este juego es una expansión de
				<a href="/game/{game.parent_game.id}">{game.parent_game.name}</a>.
			</p>
		</div>
	{/if}

	<div class="shopGame__gameInfo">
		<div class="shopGame__main">
			<Trailer {game} />

			<DLCS {dlcs} />

			<GameDescription {game} />
		</div>

		<div class="shopGame__secondary">
			<GameRating {game} />
			<div class="shopGame__genres">
				<GameShopTextField title="Géneros:" content={genres} />
			</div>

			{#if game.platforms.length > 0}
				<GameShopTextField title="Plataformas:" />
				<div class="shopGame__platforms">
					{#each game.platforms as platform (platform.id)}
						<Platform {platform} />
					{/each}
				</div>
			{/if}

			<GameSeries {game} {gamesFromSeries} />
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
		padding-right: 3%;
		margin-right: 2rem;
		gap: 0.7rem;
		@media (max-width: 750px) and (orientation: portrait) {
			width: 100%;
			border-right: none;
		}
	}
	.shopGame__secondary {
		justify-content: flex-start;
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
	}

	.shopGame__platforms {
		display: grid;
		justify-items: center;
		grid-gap: 0.5rem;
	}

	.shopGame__isDLC {
		display: flex;
		padding: 1rem;
		font-size: 2rem;
		color: lightgray;
		background-color: var(--game-data-bg-color);
		justify-content: center;
		& a {
			text-decoration: underline;
			color: var(--gamepage-playinfo-bg-color);
			&:hover {
				text-shadow: 1px 1px 2px black;
			}
		}
	}
</style>
