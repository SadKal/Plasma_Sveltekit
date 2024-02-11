<script>
	import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

	import Cover from '../../utils/Cover.svelte';
	import GameTitle from '../../utils/GameTitle.svelte';
	import UserPlayInfo from '../../utils/UserPlayInfo.svelte';

	export let game;

	let background = '/loading.gif';
	let cover = '/loading.gif';
    const roundedRating = Math.round(game.total_rating);
	const lastUpdate = new Date(game.updated_at * 1000).toISOString().slice(0, 10); //original example: 2024-01-26T23:29:28.000Z
	const releaseDate = new Date(game.first_release_date * 1000).toISOString().slice(0, 10); //slice para quedarnos solo con la fecha
	const buydate = new Date(game.buydate * 1000).toISOString().slice(0, 10);

	onMount(() => {
		const artworks = game?.artworks;
		const screenshots = game?.screenshots;

		const allImages = artworks ? [...artworks, ...(screenshots || [])] : screenshots || [];

		if (allImages.length > 0) {
			const randomIndex = Math.floor(Math.random() * allImages.length);
			const randomImage = allImages[randomIndex];
			if (randomImage) {
				background = `https://images.igdb.com/igdb/image/upload/t_screenshot_med/${randomImage.image_id}.jpg`;
			}
		} else {
			background = '/images_not_available/no_bg_available.png';
		}

		if (game?.cover?.image_id) {
			cover = `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.png`;
		} else {
			cover = '/images_not_available/no_cover_available.jpg';
		}
	});
</script>

<div
	class="gamePage__gameBG"
	style="background-image: url({background});"
/>
<div class="gamePage__mainInfo">
	<Cover {cover}/>
	<div class="gamePage__libInfo">
		<GameTitle title={game.name}/>
		<UserPlayInfo {game} {buydate}/>
	</div>
</div>

<style lang="scss">
	* {
		animation-name: fadein;
		animation-duration: var(--seconds-fadein);
		animation-timing-function: ease-in;
	}
    .gamePage__gameBG {
		height: 60vh;
		background-repeat: space;
		background-size: cover;
		filter: blur(0.5rem);
		position: relative;
		margin: 0px 0px 0px -25px;
		@media (max-width: 650px) and (orientation: portrait) {
			height: 40vh;
		}
	}
    .gamePage__mainInfo {
		position: absolute;
		width: 100%;
		display: flex;
		justify-content: space-around;
		transform: translate(0%, 50%);
		top: 0%;
	}
    .gamePage__libInfo {
		//breaks on 1400px
		display: grid;
		grid-template-rows: 1fr 1fr;
		width: 35%;
	}
</style>
