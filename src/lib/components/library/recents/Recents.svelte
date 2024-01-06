<script>
	import Thumbnails from "./Thumbnails.svelte";
</script>

<div class="library--recents__title">Tu biblioteca</div> 
<div class="library--recents">
	<Thumbnails />
</div>

<style lang="scss">
	* {
		animation-name: fadein;
		animation-duration: var(--seconds-fadein);
		animation-timing-function: ease-in;
	}
	.library--recents {
		border-bottom: 7px solid var(--text-color);
		padding-bottom: 75px;
		display: flex;
		&__title {
			margin: 75px 0px;
			text-align: center;
			font-size: 6rem;
			font-weight: 600;
			color: var(--text-color);
			letter-spacing: 1px;

			@media (max-width: 650px) and (orientation: portrait) {
				font-size: 4rem;
			}
			@media (max-width: 450px) and (orientation: portrait) {
				font-size: 3rem;
			}
		}
	}
</style>
