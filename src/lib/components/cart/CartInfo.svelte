<script>
	import { clickOutside } from '$lib/utils/outsideCart';
	import CartGame from './CartGame.svelte';
	import { useCart } from '$lib/stores/cart';
	import { useUser } from '$lib/stores/user';
	import { addGameToUser } from '$lib/api';

	const cartStore = useCart();
	const userStore = useUser();

	async function buyGames() {
		for (const game of $cartStore.gamesInCart) {
			try {
				const updatedUser = await addGameToUser($userStore, game);
				$userStore = updatedUser;
			} catch (error) {
				console.error('Error updating data:', error.message);
			}
		}
		$cartStore.gamesInCart = [];
	}
</script>

<div
	class="cart-info"
	class:active={$cartStore.cartActive}
	use:clickOutside
	on:click_outside={() => ($cartStore.cartActive = false)}
>
	<div class="cart-info__games">
		{#each $cartStore.gamesInCart as game}
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
						{$cartStore.cartTotal / 100}€
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
		display: flex;
		flex-direction: column;

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
			height: 28rem;
			border: 3px ridge var(--text-color);
			padding: 1rem 1rem 0 1rem;
			box-shadow: 5px 5px 5px 0.5px black;
			overflow: auto;
			@media (max-width: 650px) {
				top: 200%;
				width: 30rem;
			}
			@media (max-width: 550px) {
				width: 25rem;
			}
			@media (max-width: 420px) {
				width: 20rem;
			}
		}
		&__games {
			max-height: 90%;
			position: relative;
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
			width: 100%;
			color: var(--text-color);
			padding: 1rem;
			background-color: var(--cart-total-bg-color);
			font-weight: 600;
			letter-spacing: 0.1rem;
			@media (max-width: 720px) {
				font-size: 1.5rem;
			}
		}

		&__buy {
			height: 100%;
			font-size: 2rem;
			padding: 1rem;
			background-color: var(--cart-buy-bg-color);
			clip-path: polygon(5% 0, 100% 0%, 95% 100%, 0% 100%);
			cursor: pointer;
			transition: all 0.3s;
			user-select: none;
			@media (max-width: 700px) {
				font-size: 1.75rem;
			}

			&:hover {
				scale: 1.1;
			}
		}
		&__totalinfo {
			display: flex;
			padding: 1rem;
			font-size: 2rem;
			@media (max-width: 700px) {
				font-size: 1.5rem;
			}
		}
	}
</style>
