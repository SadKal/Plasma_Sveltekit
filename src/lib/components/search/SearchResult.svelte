<script>
	import { goto } from '$app/navigation';
	import { getGamePrice } from '$lib/utils/functions.js';

	export let game;
</script>

<div class="search-result" on:click={() => goto(`/game/${game.id}`)}>
	<div class="search-result__image-container">
		<img
			class="search-result__image"
			src="https://images.igdb.com/igdb/image/upload/t_screenshot_med/{game.artworks[0]
				.image_id}.jpg"
		/>
	</div>
	<div class="search-result__name">
		{game.name}
	</div>
	<div class="search-result__price">{getGamePrice(game.id)}€</div>
</div>

<style lang="scss">
	.search-result {
		display: flex;
		align-items: center;
		box-sizing: border-box;
		height: 8rem; 
		background-color: var(--search-result-color);
		padding: 0.3rem;
		transition: all 0.3s;

		@media (max-width: 650px) {
			height: 5rem;
			font-size: 0.75rem;
			z-index: 60;
		}

		@media (max-width: 420px) {
			height: 5rem;
			font-size: 12px;
		}

		&:hover {
			cursor: pointer;
			background-color: var(--search-result-hover-color);
		}
		&__name {
			color: var(--text-color);
			font-weight: 700;
			font-size: 25px;
			position: relative;
			@media (max-width: 650px) {
				height: 5rem;
				font-size: 1.25rem;
				z-index: 60;
			}
			@media (max-width: 420px) {
				height: 1rem;
				font-size: 12px;
				top: 20%;
			}
		}
		&__image {
			height: 100%;
			width: 100%;
			object-fit: cover;
			position: relative;

			&-container {
				height: 100%;
				width: 20%;
				margin-right: 1rem;
				@media (max-width: 420px) {
					width: 20%;
				}
			}
		}
		&__price {
			margin-left: auto;
			color: var(--text-color);
			font-weight: 700;
			font-size: 25px;
			position: relative;
			margin-right: 0.5rem;
			@media (max-width: 650px) {
				height: 5rem;
				font-size: 1rem;
				z-index: 60;
			}
			@media (max-width: 420px) {
				height: 2rem;
				font-size: 12px;
			}
		}
	}
</style>
