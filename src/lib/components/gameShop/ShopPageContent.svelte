<script>
	import { Progressbar } from 'flowbite-svelte';
	import GameFromSeries from './GameFromSeries.svelte';
	import GenreGame from '../genres/GenreGame.svelte';

	export let game;
	export let gamesFromSeries;

	let genres = [];
	game.genres.forEach((genre) => {
		genres.push(genre.name);
	});
</script>

<div class="shopGame__content_container">
	<div class="shopGame__gameInfo">
		<div class="shopGame__main">
			<h1>Descripción:</h1>
			<p>
				<!-- will be changed once we get API access and can bring from there-->
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab consectetur mollitia expedita quae
				quod provident praesentium amet eligendi iste alias soluta dolorum earum voluptatem repellat
				magnam dolore, omnis animi magni!
			</p>
			<h2>Sinopsis:</h2>
			<p>
				<!-- will be changed once we get API access and can bring from there-->
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab consectetur mollitia expedita quae
				quod provident praesentium amet eligendi iste alias soluta dolorum earum voluptatem repellat
				magnam dolore, omnis animi magni! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi
				fugit incidunt asperiores autem similique officiis temporibus inventore ipsam sunt. Eaque illum
				vero dolorem quo rem. Autem sunt delectus perferendis eum.
			</p>
		</div>
		<div class="shopGame__secondary">
			<div class="shopGame__rating">
				{#if game.total_rating != undefined}
					<h1>Valoración: {Math.round(game.total_rating)}</h1>
					<Progressbar progress={game.total_rating} color="primary" size="h-5" />
				{:else}
					<h1>Este juego no tiene valoración</h1>
				{/if}
			</div>

			<div class="shopGame__genres">
				<h1>Géneros:</h1>
				{#each genres as genre}
					<!-- ideally, clickable and will bring to genres-->
					<p>{genre}</p>
				{/each}
			</div>

			{#if gamesFromSeries.length > 0}
				<div class="shopGame__series">
					<h1>Saga:</h1>
					<p>{game.collections[0].name}</p>

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
	h1,
	h2 {
		color: var(--subtitle-text-color);
	}
	p {
		color: var(--text-color);
		font-weight: 600;
		line-height: 140%;
		margin: 3px 0;
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
		width: 80%;
		margin: 0 auto;
		padding-top: 2rem;
		display: flex;
		justify-content: space-between;
		@media (max-width: 750px) {
			display: block;
		}
	}
	.shopGame__main {
		width: 70%;
		border-right: 3px solid var(--game-data-bg-color);
		padding-right: 7.5%;
		margin-right: 2rem;
		@media (max-width: 750px) and (orientation: portrait) {
			width: 100%;
			border-right: none;
		}
	}
	.shopGame__secondary {
		justify-content: space-between;
		display: flex;
		flex-direction: column;
		text-align: end;
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
		align-items: flex-end;
	}
</style>
