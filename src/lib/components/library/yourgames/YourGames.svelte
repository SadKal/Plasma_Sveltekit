<script>
	import Gamelist from "./content_insides/GameList.svelte";
</script>

<div class="library--urgames__content">
	<Gamelist />
</div>

<style lang="scss">
	$text-color: rgb(209, 51, 100);

	* {
		animation-name: fadein;
		animation-duration: var(--seconds-fadein);
		animation-timing-function: ease-in;
	}
	.library--urgames__content {
		padding-top: 100px;
		width: 90%;
		margin: 0 auto;
	}
</style>
