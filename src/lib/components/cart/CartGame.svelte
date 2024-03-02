<script>
	import { useCart } from '$lib/stores/cart';
	import { getGamePrice } from '$lib/utils/functions.js';
	import Cover from '$lib/utils/Cover.svelte';

	export let game;

	const cartStore = useCart();

	let cover = game?.cover?.image_id
		? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.png`
		: '/images_not_available/no_cover_available.jpg';
</script>

<div class="cart-game">
	<div class="cart-game__cover">
		<Cover {cover} height="100%" width="100%" />
	</div>
	<div class="cart-game__name">
		{game.name}
	</div>
	<div class="cart-game__price">
		{getGamePrice(game.id)}€
	</div>
	<div
		class="cart-game__cancel"
		on:click={() => {
			cartStore.removeGameFromCart(game);
		}}
	>
		x
	</div>
</div>

<style lang="scss">
	.cart-game {
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		height: 10rem;
		background-color: var(--cart-element-bg-color);
		margin-bottom: 0.3rem;
		transition: all 0.3s ease-in-out;
		@media (max-width: 700px) {
			height: 8rem;
		}
		@media (max-width: 550px) {
			height: 7rem;
		}
		&__cover {
			height: 100%;
			width: 20%;
			@media (max-width: 700px) {
				font-size: 1.5rem;
			}
		}
		&__name {
			width: 50%;
			font-size: 1.5rem;
			color: var(--text-color);
			margin-left: 1rem;
			@media (max-width: 700px) {
				font-size: 1.25rem;
				width: 40%;
			}
		}
		&__price {
			font-size: 1.5rem;
			color: var(--text-color);
			padding: 1rem;
			@media (max-width: 700px) {
				font-size: 1rem;
			}
		}
		&__cancel {
			box-sizing: border-box;
			font-size: 2rem;
			color: var(--text-color);
			margin: 1rem;
			transition: all 0.3s ease-in-out;

			&:hover {
				color: lightgray;
				cursor: pointer;
			}
		}
	}
</style>
