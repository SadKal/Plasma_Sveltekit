<script>
	import { onMount } from 'svelte';

	import BuyButton from '$lib/utils/BuyButton.svelte';
	import Cover from '$lib/utils/Cover.svelte';
	import GameTitle from '$lib/utils/GameTitle.svelte';

	export let game;

	let gameInCart;

	let background = '/loading.gif';
	let cover = '/loading.gif';

	onMount(() => {
		const artworks = game?.artworks;
		const screenshots = game?.screenshots;

		// Depndiendo de si hay o no artworks o screenshots se rellena el array con ambos o con alguno o con ninguno
		const allImages = artworks ? [...artworks, ...(screenshots || [])] : screenshots || [];

		if (allImages.length > 0) {
			const randomIndex = Math.floor(Math.random() * allImages.length);
			const randomImage = allImages[randomIndex];
			if (randomImage) {
				background = `https://images.igdb.com/igdb/image/upload/t_screenshot_med/${randomImage.image_id}.jpg`;
			}
		} else {
			background = '/images_not_available/no_bg_available.png';
		}

		if (game?.cover?.image_id) {
			cover = `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.png`;
		} else {
			cover = '/images_not_available/no_cover_available.jpg';
		}
	});
</script>

<div class="shopGame__gameBG" style="background-image: url({background});" />
<div class="shopGame__container">
	<div class="shopGame__info">
		<GameTitle title={game.name} />
		<BuyButton {game} bind:gameInCart />
	</div>
	<Cover {cover} {gameInCart} />
</div>

<style lang="scss">
	* {
		animation-name: fadein;
		animation-duration: var(--seconds-fadein);
		animation-timing-function: ease-in;
	}
	.shopGame__container {
		position: absolute;
		width: 100%;
		margin: auto;
		top: 0%;
		display: flex;
		justify-content: space-around;
		transform: translate(0%, 40%);
	}
	.shopGame__gameBG {
		height: 60vh;
		background-repeat: space;
		background-size: cover;
		filter: blur(0.5rem);
	}
	.shopGame__info {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: flex-start;
	}
</style>
