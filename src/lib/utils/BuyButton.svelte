<script>
	import { useCart } from '$lib/stores/cart';
	import { useUser } from '$lib/stores/user';
	import { getGamePrice } from '$lib/utils/functions.js';

	export let game;
	export let gameInCart;

	const parent = game?.parent_game;

	const userStore = useUser();
	const cartStore = useCart();

	console.log($userStore.games);

	let parentOwned = true;
	const isDlc = game.category == 2 || game.category == 1;
	if (parent && isDlc) {
		parentOwned = $userStore?.games?.some((libraryGame) => libraryGame.id === parent.id)
			? true
			: false;
	}
	function setGameInCart() {
		if (!gameOwned && parentOwned) {
			//Game tiene TODA la informacion(consolas, sinopsis, etc...), solo necesitamos ID, titulo, ID de la cover y su categoria
			const gameInfoNeeded = {
				id: game.id,
				cover: game.cover,
				name: game.name,
				category: game.category,
				parent_game: game.parent_game
			};

			cartStore.addGameToCart(gameInfoNeeded);
			gameInCart = true;
			setTimeout(() => {
				$cartStore.cartActive = true;
			}, 350);
			setTimeout(() => {
				$cartStore.cartActive = false;
			}, 2000);
		}
	}

	let gameOwned = false;
	$: if ($userStore?.games?.some((libraryGame) => libraryGame.id === game.id)) {
		gameOwned = true;
	} else if ($userStore?.games?.some((libraryGame) => libraryGame.id === parent?.id)) {
		const thisParent = $userStore?.games?.find((libraryGame) => libraryGame.id === parent.id);
		console.log(thisParent);
		if (thisParent?.dlcs?.some((dlc) => dlc.id === game.id)) {
			gameOwned = true;
		}
	}

	$: gameInCart = $cartStore.gamesInCart.some((cartGame) => cartGame.id === game.id) ? true : false;
</script>

<div class="shopGame__toCart" on:click={setGameInCart}>
	{#if gameOwned}
		Ya tienes este juego.
	{:else if gameInCart}
		Juego ya en el carrito.
	{:else if !parentOwned && (game.category === 1 || game.category === 2)}
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
		max-width: 100%;
		padding: 0.5rem 2em;
		clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
		cursor: pointer;
		user-select: none;

		transition: all 0.2s;

		&:hover {
			scale: 1.1;
		}
	}
</style>
