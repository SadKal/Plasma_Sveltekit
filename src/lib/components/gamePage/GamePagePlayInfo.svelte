<script>
	export let game;
	const roundedRating = Math.round(game.total_rating);
	const lastUpdate = new Date(game.updated_at * 1000).toISOString().slice(0, 10); //original example: 2024-01-26T23:29:28.000Z
	const releaseDate = new Date(game.first_release_date * 1000).toISOString().slice(0, 10); //slice para quedarnos solo con la fecha
</script>

<div class="gamePage__playInfo">
	<div class="gamePage__playInfo-rating">
		<p class="gamePage__playInfo-titles">Valoración media:</p>
		<span>{roundedRating}</span>
	</div>
	<div class="gamePage__playInfo-update">
		<p class="gamePage__playInfo-titles">Última actualización:</p>
		<span>{lastUpdate}</span>
	</div>
	<div class="gamePage__playInfo-launch">
		<p class="gamePage__playInfo-titles">Fecha de lanzamiento:</p>
		<span>{releaseDate}</span>
	</div>
</div>

<style lang="scss">
	.gamePage__playInfo {
		background-color: var(--gamepage-playinfo-bg-color);
		margin-top: -10px;
		position: relative;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		&-titles {
			font-size: 2rem;
			margin: .5rem 20px .5rem 0;
			color: white;
		}
		& span {
			font-size: 1.5rem;
			align-self: center;
			color: var(--selected-text-color);
			margin: 1rem 20px 1rem 0;
		}
		&-rating,
		&-update,
		&-launch {
			display: flex;
			width: fit-content;
		}
	}
</style>
