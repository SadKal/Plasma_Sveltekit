<script>
	export let cover;
	export let gameInCart = false;
	export let height = '400px';
	export let width = '300px';
</script>

<div
	class="coverArt"
	class:active={gameInCart}
	style="background-image: url({cover}); height: {height}; width: {width}"
/>

<style lang="scss">
	.coverArt {
		top: 15%;
		left: 10%;
		background-size: cover;
		background-repeat: round;
		border-radius: 1%;
		transition: all 0.4s ease-in-out;
		opacity: 100%;

		&.active {
			opacity: 0;
		}
	}
</style>
