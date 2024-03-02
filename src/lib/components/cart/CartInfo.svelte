<script>
	import { clickOutside } from '$lib/utils/outsideCart';
	import CartGame from './CartGame.svelte';
	import { useCart } from '$lib/stores/cart';
	import { useUser } from '$lib/stores/user';
	import { addGameToUser } from '$lib/api';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	const cartStore = useCart();
	const userStore = useUser();

	async function buyGames() {
		if ($userStore?.games) {
			for (let i = $cartStore.gamesInCart.length - 1; i >= 0; i--) {
				const game = $cartStore.gamesInCart[i];
				try {
					const updatedUser = await addGameToUser($userStore, game);
					cartStore.removeGameFromCart(game);
					$userStore = updatedUser;
				} catch (error) {
					console.error('Error updating data:', error.message);
				}
			}
			window.localStorage.removeItem('cart');
		} else {
			goto(`/login?redirectTo=${$page.url.pathname}`);
		}
	}
	$: totalPrice = cartStore.getTotalPrice($cartStore.gamesInCart);
</script>

<div
	class="cart-info"
	class:active={$cartStore.cartActive}
	use:clickOutside
	on:click_outside={() => ($cartStore.cartActive = false)}
>
	<div class="cart-info__games">
		{#each $cartStore.gamesInCart as game (game.id)}
			<CartGame {game} />
		{/each}
		{#if $cartStore.gamesInCart.length == 0}
			<div class="cart-info__empty">
				<p>El carro está vacío.</p>
				<p>¡Añade algun juego!</p>
			</div>
		{:else}
			<div class="cart-info__total clearfix">
				<div class="cart-info__buy" on:click={buyGames}>Comprar</div>
				<div class="cart-info__totalinfo">
					<div class="cart-info__text">Total:</div>
					<div class="cart-info__price">
						{parseFloat(totalPrice)}€
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.cart-info {
		box-sizing: border-box;
		position: absolute;
		cursor: default;

		opacity: 0;
		right: 5%;
		top: 0;
		width: 0;
		height: 0;
		z-index: 200;

		transition: all 0.3s ease-in-out;
		overflow: hidden;

		&.active {
			opacity: 100%;
			right: 5%;
			top: 120%;

			background-color: var(--cart-bg-color);
			width: 40rem;
			height: 30rem;
			border: 3px solid var(--text-color);
			padding: 0.5rem 0.5rem 0 0.5rem;
			overflow: auto;
			@media (max-width: 700px) {
				width: 30rem;
			}
			@media (max-width: 550px) {
				width: 25rem;
			}
			@media (max-width: 420px) {
				width: 20rem;
			}
		}

		&__empty {
			font-size: 2rem;
			color: var(--text-color);
			text-align: center;
		}

		&__total {
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			position: sticky;
			bottom: 0;
			color: var(--text-color);
			padding: 1rem;
			background-color: var(--cart-total-bg-color);
			@media (max-width: 720px) {
				font-size: 1.5rem;
			}
		}

		&__buy {
			height: 100%;
			font-size: 2rem;
			padding: 1rem;
			background-color: var(--cart-buy-bg-color);
			cursor: pointer;
			transition: all 0.3s;
			@media (max-width: 700px) {
				font-size: 1.75rem;
			}

			&:hover {
				color: #fff;
				scale: 1.1;
			}
		}
		&__totalinfo {
			display: flex;
			padding: 1rem;
			font-size: 2rem;
			gap: 0.5rem;
			@media (max-width: 700px) {
				font-size: 1.5rem;
			}
		}
	}
</style>
