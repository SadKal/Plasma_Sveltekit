<script>
	export let trailer;

	export let showTrailer;
</script>

<div class="trailer" class:active={showTrailer}>
	<iframe
		width="100%"
		height="100%"
		src="https://www.youtube.com/embed/{trailer}"
		title="Game trailer"
		importance="low"
		allowfullscreen
	></iframe>
</div>

<style lang="scss">
	.trailer {
		box-sizing: border-box;
		padding: 0.4rem;
		opacity: 0;
		background-color: var(--game-title-color-center);
		width: 100%;
		height: 0;
		transition: all 0.3s;

		&.active {
			opacity: 100%;
			height: 40rem;
			@media (max-width: 1700px) {
				height: 30rem;
			}
			@media (max-width: 1250px) {
				height: 20rem;
			}
		}
	}
</style>
