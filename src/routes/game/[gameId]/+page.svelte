<script>
	import libraryStore from "$lib/stores/library";
	import GamePageContent from "$lib/components/gameShop/ShopPageContent.svelte";
	import { onMount } from "svelte";
	import { useCart } from '$lib/stores/cart';
	
    export let data;

	const cartStore = useCart();

	let game = data.game;

	$: gameOwned = ($libraryStore.gamesInLibrary.some( libraryGame => libraryGame.id === game.id )? true : false);
	$: gameInCart = ($cartStore.gamesInCart.some( cartGame => cartGame.id === game.id ) ? true : false);

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

	onMount(() => {
		window.scrollTo(0, 0);
	});
</script>

<div class="shopGame__container">
	<div class="shopGame__gameBG" style="background-image: url({game.image});" />
	<div
		class="shopGame__coverArt"
		class:active={gameInCart}
		style="background-image: url({game.cover});"
	/>
	<div class="shopGame__title">
		<span>{game.name}</span>
	</div>
</div>

<div class="shopGame__toCart" on:click={setGameInCart}>
	{#if gameOwned}
		Ya tienes este juego.
	{:else if gameInCart}
		Juego ya en el carrito.
	{:else}
		Añadir al carrito: {game.price / 100}€
	{/if}
</div>

<GamePageContent {game}/>

<style lang="scss">
	* {
		animation-name: fadein;
		animation-duration: var(--seconds-fadein);
		animation-timing-function: ease-in;
	}
	.shopGame__container {
		position: relative;
		width: 100%;
		margin: 0 auto;
	}
	.shopGame__gameBG {
		height: 60vh;
		background-repeat: round;
		background-size: cover;
		filter: blur(1.5rem);
		position: relative;
		z-index: 0;
		
		margin: 25px 0px 0px -25px;
		@media (max-width: 650px) and (orientation:portrait) {
			height: 40vh;
		}
	}
	.shopGame__coverArt {
		height: 400px;
			width: 300px;
		position: absolute;
		top: 15%;
		left: 70%;

		background-size: cover;
		background-repeat: round;
		border-radius: 1%;
		transition: all 0.4s ease-in-out;
		opacity: 100%;
		@media (max-width: 1050px) and (orientation: portrait) {
			height: 400px;
			width: 300px;
			left: 60%;

		}
		@media (max-width: 650px) and (orientation: portrait) {
			height: 225px;
			width: 175px;
			left: 55%;
			top: 10%;
		}
		@media (min-width: 1500px) and (orientation: landscape) {
			height: 400px;
			width: 300px;
			left: 75%;
		}
		@media (max-height: 900px) and (orientation: landscape) {
			height: 300px;
			width: 225px;
			left: 75%;
			top: 10%;
		}
		@media (max-height: 600px) and (orientation: landscape) {
			height: 225px;
			width: 175px;
			left: 75%;
			top: 5%;
		}

		&.active {
			opacity: 0;
			top: -10%;
			width: 0;
			height: 0;
			left: 100%;
		}
	}
	.shopGame__title {
		background-color: var(--game-title-background-color);

		color: var(--selected-text-color);
		padding: .75rem 2.5rem;
		top: 40%;
		left: 10%;
		text-align: center;
		clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
		font-size: 2rem;
		position: absolute;
		@media (max-width: 900px) and (orientation:portrait) {
			max-width: 25%;
			top: 15%;
		}
		@media (max-width: 650px) and (orientation:portrait) {
			font-size: 1.25rem;	
			max-width: 30%;
			padding: 3% 7%;
		}
		@media (max-width: 450px) and (orientation:portrait) {
			font-size: 1rem;	
		}
		@media (max-height: 900px) and (orientation: landscape) {
			top: 20%;
		}
		@media (max-height: 600px) and (orientation:landscape) {
			font-size: 1.5rem;		
			max-width: 30%;
			top: 10%;
			padding: 1% 5%;
		}
	}
	.shopGame__toCart {
		background-color: var(--add-to-cart-button-background);

		color: var(--search-result-hover-color);
		font-size: 1.35rem;
		text-align: center;
		margin: 0 auto;
		width: 15%;
		position: absolute;
		top: 45%;
		left: 10%;
		padding: .5rem 1.5em;
		clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
		cursor: pointer;
		user-select: none;
		@media (max-width: 900px) and (orientation:portrait) {
			top: 45%;
			width: 25%;
		}
		@media (max-width: 650px) and (orientation:portrait) {
			top: 35%;
		}
		@media (max-width: 450px) and (orientation:portrait) {
			font-size: .75rem;	
			max-width: 30%;
			padding: 2% 4%;
		}
		@media (max-height: 900px) and (orientation: landscape) {
			top:45%
		}
		@media (max-height: 600px) and (orientation:landscape) {
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
