<script>
	import { Progressbar } from 'flowbite-svelte';
	import GameFromSeries from './GameFromSeries.svelte';
	import GameShopTextField from './GameShopTextField.svelte';
	import DLCS from './DLCS.svelte';
	import Company from './Company.svelte';
	import Platform from './Platform.svelte';
	import Trailer from './Trailer.svelte';

	export let game;
	export let dlcs;
	export let gamesFromSeries;

	let showTrailer = true;

	let genres = [];
	let localizations = [];
	let companies = [];
	if (game.genres) {
		game.genres.forEach((genre) => {
			genres.push(genre.name);
		});
	}

	if (game.game_localizations) {
		game.game_localizations.forEach((loc) => {
			localizations.push(loc.name);
		});
	}
	if (game.involved_companies) {
		game.involved_companies.forEach((company) => {
			companies.push(company.company);
		});
	}
</script>

<div class="shopGame__content_container">
	<div class="shopGame__gameInfo">
		<div class="shopGame__main">
			{#if game.videos}
				<div class="shopGame__trailer">
					<div class="shopGame__trailer__title">
						<GameShopTextField title="Trailer:" />
						<span class="shopGame__trailer__show" class:active={showTrailer}>&lt</span>
					</div>

					<Trailer trailer={game.videos[0].video_id} bind:showTrailer />
				</div>
			{/if}

			{#if dlcs.length > 0}
				<GameShopTextField title="DLCs:" />
				<DLCS {dlcs} />
			{/if}
			{#if game.summary}
				<GameShopTextField title="Descripción:" content={game.summary} />
			{/if}
			{#if game.storyline}
				<GameShopTextField title="Sinopsis:" content={game.storyline} />
			{/if}
			{#if game.involved_companies}
				<GameShopTextField title="Desarrollado por:" />
				<div class="companies">
					{#each companies as company}
						<Company {company} />
					{/each}
				</div>
			{/if}
			{#if game.game_localizations}
				<GameShopTextField title="Títulos internacionales:" content={localizations} />
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
					<GameShopTextField title="Este juego no tiene valoración." />
				{/if}
			</div>

			<div class="shopGame__genres">
				<GameShopTextField title="Géneros:" content={genres} />
			</div>

			{#if game.platforms.length > 0}
				<div class="shopGame__platforms">
					<GameShopTextField title="Plataformas:" />
					{#each game.platforms as platform (platform.id)}
						<Platform {platform} />
					{/each}
				</div>
			{/if}

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
	.companies {
		display: grid;
		grid-template-columns: repeat(auto-fit, 500px);
		grid-gap: 2rem;
	}
	.shopGame__platforms {
		display: grid;
		justify-items: center;
		grid-gap: 0.5rem;
	}
	.shopGame__trailer {
		box-sizing: border-box;
		background-color: var(--cart-buy-bg-color);
		padding: 0.4rem 0 0 0;
		&__title {
			margin-left: 1rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		&__show {
			box-sizing: border-box;
			color: var(--text-color);
			font-weight: 900;
			padding: 0.4rem;
			font-size: 2rem;
			margin-right: 2rem;
			&:hover {
				cursor: pointer;
			}
			&.active {
				transform: rotate(-90deg);
			}
		}
	}
</style>
