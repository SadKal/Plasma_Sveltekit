<script>
	export let game;
	import { goto } from '$app/navigation';

	const artwork = game.artworks
		? `https://images.igdb.com/igdb/image/upload/t_720p/${game.artworks[0].image_id}.jpg`
		: '/images_not_available/no_bg_available.png';
</script>

<div class="gameFromSeries" on:click={() => goto(`/game/${game.id}`)}>
	<div class="gameFromSeries__name">
		{game.name}
	</div>

	<div class="gameFromSeries__img--container">
		<img class="gameFromSeries__img" src={artwork} alt="game artwork" />
	</div>
</div>

<style lang="scss">
	.gameFromSeries {
		display: flex;
		justify-content: space-between;
		align-items: center;

		width: 100%;
		height: 7rem;
		box-sizing: border-box;
		margin-top: 0.5rem;

		font-weight: 700;
		background-color: rgba(0, 74, 64, 0.5);
		color: var(--text-color);
		clip-path: polygon(2% 0, 100% 0%, 98% 100%, 0% 100%);
		transition: all 0.3s ease-in-out;

		&:hover {
			background-color: rgb(0, 74, 64);
			transform: translateX(10%);
			z-index: 5;
			cursor: pointer;
		}

		&__name {
			text-align: left;

			margin-left: 1rem;
			width: 40%;
		}
		&__img {
			object-fit: fill;
			clip-path: polygon(7% 0, 100% 0%, 93% 100%, 0% 100%);
			height: 100%;
			width: 100%;
			&--container {
				height: 100%;
				width: 35%;
			}
		}
	}
</style>
