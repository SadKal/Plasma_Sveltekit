<script>
	export let cover;
	export let gameInCart;
</script>

<div class="coverArt" class:active={gameInCart} style="background-image: url({cover});" />

<style lang="scss">
	.coverArt {
		height: 400px;
		width: 300px;
		top: 15%;
		left: 10%;
		background-size: cover;
		background-repeat: round;
		border-radius: 1%;
		transition: all 0.4s ease-in-out;
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
		}
	}
</style>
