<script>
	export let title;
</script>

<div class="game__title">
	<span>{title}</span>
</div>

<style lang="scss">
	.game__title {
		background-color: var(--game-title-background-color);
		color: var(--selected-text-color);
		padding: 0.75rem 4rem;
		width: fit-content;
		text-align: center;
		clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
		font-size: 3rem;
		align-self: start;
		justify-self: center;

		@media (max-width: 900px) and (orientation: portrait) {
			max-width: 25%;
			top: 15%;
		}
		@media (max-width: 650px) and (orientation: portrait) {
			font-size: 1.25rem;
			max-width: 30%;
			padding: 3% 7%;
		}
		@media (max-width: 450px) and (orientation: portrait) {
			font-size: 1rem;
		}
		@media (max-height: 900px) and (orientation: landscape) {
			top: 20%;
		}
		@media (max-height: 600px) and (orientation: landscape) {
			font-size: 1.5rem;
			max-width: 30%;
			top: 10%;
			padding: 1% 5%;
		}
	}
</style>
