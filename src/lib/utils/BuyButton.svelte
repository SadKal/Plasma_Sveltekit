<script>
	import { useCart } from '$lib/stores/cart';
	import { useUser } from '$lib/stores/user';
	import { getGamePrice } from '$lib/utils/functions.js';

	export let game;
	export let gameInCart;

	const parent = game?.parent_game;
	console.log(game.category);

	console.log(game);
	console.log(parent);
	const userStore = useUser();
	const cartStore = useCart();
	$: console.log($userStore);

	let parentOwned = true;
	if (parent) {
		parentOwned = $userStore.games.some((libraryGame) => libraryGame.id === parent.id)
			? true
			: false;
	}

	function setGameInCart() {
		if (!gameOwned && parentOwned) {
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

	$: gameOwned = $userStore.games.some((libraryGame) => libraryGame.id === game.id) ? true : false;
	$: gameInCart = $cartStore.gamesInCart.some((cartGame) => cartGame.id === game.id) ? true : false;
</script>

<div class="shopGame__toCart" on:click={setGameInCart}>
	{#if gameOwned}
		Ya tienes este juego.
	{:else if gameInCart}
		Juego ya en el carrito.
	{:else if (!parentOwned && game.category === 1) || game.category === 2}
		No tienes el juego padre
	{:else}
		Añadir al carrito: {getGamePrice(game.id)}€
	{/if}
</div>

<style lang="scss">
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
		transition: all 0.2s;
		&:hover {
			scale: 1.1;
		}
	}
</style>
