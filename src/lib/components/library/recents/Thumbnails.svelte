<script>
	export let thumbnails;
</script>

<div class="library--recents">
	<div class="library--recents__title">Juegos recientes</div>
	{#each thumbnails as thumbnail}
		<div
			class="library--recents__thumbnails thumbnail--small"
			style="background-image: url('https://images.igdb.com/igdb/image/upload/t_cover_big/{thumbnail.cover.image_id}.png');"
		/>
	{/each}
</div>

<style lang="scss">
	.library--recents {
		width: 90%;
		margin: 0 auto; 

		&__title {
			font-weight: 600;
			color: var(--text-color);
			font-size: 3rem;
			margin-bottom: 20px;
			letter-spacing: 1px;
			@media (max-width: 1080px) and (orientation: portrait) {
				font-size: 2rem;
			}
			@media (max-width: 500px) and (orientation: portrait) {
				font-size: 1.5rem;
			}
		}
	}
	.thumbnail {
		&--small {
			border-radius: 1%;
			height: 22vw;
			width: 18%;
			background-size: contain;
			background-repeat: round;
			margin-right: 2%;
			margin-bottom: 1%;
			display: inline-block;
			transition: all 0.4s;
			@media (max-width: 1750px) and (orientation: landscape) {
				height: 27vw;
				width: 23%;
			}
			@media (max-width: 1366px) and (orientation: landscape) {
				width: 31%;
				height: 36vw;
			}
			@media (max-width: 1080px) and (orientation: portrait) {
				width: 46%;
				margin-right: 4%;
				margin-top: 2%;
				height: 56vw;
			}
		}
		&--small:hover,
		&--small:active {
			border-radius: 2%;
			scale: 1.05;
			display: inline-block;
			background-size: contain;
			background-repeat: round;
			transition: all 0.2s;
			margin-top: 1%;
			margin-bottom: 2%;
		}
	}
</style>
