<script>
	export let game;
	import { useCart } from '$lib/stores/cart';

	const cartStore = useCart();
</script>

<div class="cart-game">
	<!-- <div class="cart-game__cover">
            <img class="cart-game__img" src={game.cover} >
        </div> -->
	<div class="cart-game__name">
		{game.name}
	</div>
	<div class="cart-game__price">
		{game.price / 100}€
	</div>
	<div
		class="cart-game__cancel"
		on:click={() =>
			setTimeout(() => {
				cartStore.removeGameFromCart(game);
			}, 50)}
	>
		x
	</div>
</div>

<style lang="scss">
	.cart-game {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		height: 9rem;
		width: auto;
		padding: 0rem;
		background-color: var(--cart-element-bg-color);
		margin-bottom: 0.3rem;
		transition: all 0.3s ease-in-out;

		&__cover {
			height: 100%;
			width: 18%;
			@media (max-width: 700px) {
				font-size: 1.5rem;
			}
		}
		&__img {
			height: 100%;
			width: 100%;
			object-fit: cover;
		}
		&__name {
			width: 50%;
			padding-left: 1rem;
			font-size: 1.7rem;
			font-weight: 600;
			letter-spacing: 0.1rem;
			color: var(--text-color);
			max-width: 45%;
			@media (max-width: 700px) {
				font-size: 1.25rem;
				max-width: 25%;
			}
		}
		&__price {
			width: 10%;
			font-size: 1.3rem;
			font-weight: 600;
			letter-spacing: 0.1rem;
			color: var(--text-color);
			padding: 1rem;
			@media (max-width: 700px) {
				font-size: 1rem;
				transform: translate(50%, -50%);
				top: 80%;
			}
		}
		&__cancel {
			box-sizing: border-box;
			font-size: 2rem;
			font-weight: 600;
			color: var(--text-color);
			padding: 1rem;
			border-radius: 50%;
			transition: all 0.3s ease-in-out;

			&:hover {
				color: lightgray;
			}
		}
	}
</style>
