<script>
	import CartInfo from './CartInfo.svelte';
	import { useCart } from '$lib/stores/cart';

	const cartStore = useCart();
</script>

<div class="cart--container">
	<div class="cart__count__container">
		<div class="cart__count">
			{$cartStore.gamesInCart.length}
		</div>
	</div>
	<div on:click={() => ($cartStore.cartActive = !$cartStore.cartActive)}>
		<object
			title="cart"
			class="cart"
			data="/svgs/cart.svg"
			type="image/svg+xml"
			width="70%"
			height="auto"
		/>
	</div>
	<CartInfo />
</div>

<style lang="scss">
	.cart {
		box-sizing: border-box;
		user-select: none;
		pointer-events: none;
		height: 4rem;
		width: 4rem;

		&--container {
			cursor: pointer;
			display: flex;
			margin-right: 2rem;
		}

		&__count {
			color: lightgray;
			overflow: hidden;
			white-space: nowrap;

			&__container {
				width: 1.3rem;
				height: 1.3rem;
				border-radius: 50%;
				display: flex;
				justify-content: center;
				text-overflow: clip;
				align-items: center;
				background-color: rgb(0, 33, 29);
			}
		}
	}
</style>
