<script>
	import ShopPageContent from '$lib/components/gameShop/ShopPageContent.svelte';
	import { useCart } from '$lib/stores/cart';
	import { useUser } from '$lib/stores/user';
	import { page } from '$app/stores';

	console.log('alo');

	export let data;
	console.log($page);

	const cartStore = useCart();
	const userStore = useUser();

	let { game, gamesFromSeries } = data;

	$: gameOwned = $userStore.games.some((libraryGame) => libraryGame.id === game.id) ? true : false;
	$: gameInCart = $cartStore.gamesInCart.some((cartGame) => cartGame.id === game.id) ? true : false;

	function setGameInCart() {
		if (!gameOwned) {
			cartStore.addGameToCart(game);
			gameInCart = true;
			setTimeout(() => {
				$cartStore.cartActive = true;
			}, 350);
			setTimeout(() => {
				$cartStore.cartActive = false;
			}, 2000);
		}
	}

	//Background handling
	const artworks = game.artworks;
	const screenshots = game.screenshots;

	let allImages;
	if (artworks == undefined) {
		if (screenshots == undefined) {
			allImages = undefined;
		} else {
			allImages = screenshots;
		}
	} else {
		if (screenshots == undefined) {
			allImages = artworks;
		} else {
			allImages = [...artworks, ...screenshots];
		}
	}

	const random = allImages ? Math.floor(Math.random() * allImages.length) : -1;
	const background =
		random != -1
			? `https://images.igdb.com/igdb/image/upload/t_screenshot_med/${allImages[random].image_id}.jpg`
			: '/images_not_available/no_bg_available.png';

	//Cover handling
	let cover =
		game.cover.image_id == undefined
			? '/images_not_available/no_cover_available.jpg'
			: `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.png`;
</script>

{#key data.game}
	<div class="shopGame__gameBG" style="background-image: url({background});" />
	<div class="shopGame__container">
		<div class="shopGame__info">
			<div class="shopGame__title">
				<span>{game.name}</span>
			</div>
			<div class="shopGame__toCart" on:click={setGameInCart}>
				{#if gameOwned}
					Ya tienes este juego.
				{:else if gameInCart}
					Juego ya en el carrito.
				{:else}
					Añadir al carrito: 59.99€
				{/if}
			</div>
		</div>
		<div
			class="shopGame__coverArt"
			class:active={gameInCart}
			style="background-image: url({cover});"
		/>
	</div>

	<ShopPageContent {game} {gamesFromSeries} />
{/key}

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
		position: relative;
		z-index: 0;
		margin: 0px 0px 0px -25px;
		@media (max-width: 650px) and (orientation: portrait) {
			height: 40vh;
		}
	}
	.shopGame__coverArt {
		height: 10vw;
		width: 300px;
		top: 15%;
		left: 10%;
		background-size: cover;
		background-repeat: round;
		border-radius: 1%;
		transition: all 0.5s ease-in-out;
		opacity: 100%;

		@media (max-width: 1050px) and (orientation: portrait) {
			height: 400px;
			width: 300px;
		}
		@media (max-width: 650px) and (orientation: portrait) {
			height: 225px;
			width: 175px;
			top: 10%;
		}
		@media (min-width: 1500px) and (orientation: landscape) {
			height: 400px;
			width: 300px;
		}
		@media (max-height: 900px) and (orientation: landscape) {
			height: 300px;
			width: 225px;
			top: 10%;
		}
		@media (max-height: 600px) and (orientation: landscape) {
			height: 225px;
			width: 175px;
			top: 5%;
		}

		&.active {
			opacity: 0;
			// top: -10%;
			//width: 0;
			//height: 0;
			// left: 100%;
		}
	}

	.shopGame__info {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: flex-start;
		width: 50%;
	}
	.shopGame__title {
		background-color: var(--game-title-background-color);

		color: var(--selected-text-color);
		padding: 0.75rem 4rem;
		margin: 0 0 2rem 0;
		text-align: center;
		clip-path: polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%);
		font-size: 2.5rem;

		@media (max-width: 900px) and (orientation: portrait) {
			max-width: 25%;
			top: 15%;
		}
		@media (max-width: 650px) and (orientation: portrait) {
			font-size: 1.25rem;
			max-width: 30%;
			padding: 3% 7%;
		}
		@media (max-width: 450px) and (orientation: portrait) {
			font-size: 1rem;
		}
		@media (max-height: 900px) and (orientation: landscape) {
			top: 20%;
		}
		@media (max-height: 600px) and (orientation: landscape) {
			font-size: 1.5rem;
			max-width: 30%;
			top: 10%;
			padding: 1% 5%;
		}
	}
	.shopGame__toCart {
		background-color: var(--add-to-cart-button-background);

		color: var(--search-result-hover-color);
		font-size: 1.75rem;
		text-align: center;
		margin: 0 0 2rem 0;
		max-width: 75%;
		padding: 0.5rem 2em;
		clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
		cursor: pointer;
		user-select: none;

		@media (max-width: 900px) and (orientation: portrait) {
			top: 45%;
			width: 25%;
		}
		@media (max-width: 650px) and (orientation: portrait) {
			top: 35%;
		}
		@media (max-width: 450px) and (orientation: portrait) {
			font-size: 0.75rem;
			max-width: 30%;
			padding: 2% 4%;
		}
		@media (max-height: 900px) and (orientation: landscape) {
			top: 45%;
		}
		@media (max-height: 600px) and (orientation: landscape) {
			top: 50%;
			width: 15%;
			font-size: 1rem;
		}

		&:hover {
			scale: 1.1;
		}
		transition: all 0.2s;
	}
</style>
