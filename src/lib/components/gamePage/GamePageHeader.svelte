<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { useUser } from '$lib/stores/user';
	import { Button, Modal } from 'flowbite-svelte';
	import { deleteGameAndReviewsFromUser } from '$lib/utils/functions';
	import Cover from '../../utils/Cover.svelte';
	import GameTitle from '../../utils/GameTitle.svelte';
	import UserPlayInfo from '../../utils/UserPlayInfo.svelte';

	export let game;
	export let dlcs;
	const userStore = useUser();

	let showModal = false;
	let background = '/loading.gif';
	let cover = '/loading.gif';
	const buydate = new Date(game.buydate).toISOString().slice(0, 10);

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
	
	async function deleteGame() {
		if ($userStore?.games) {
			try {
				const updatedUser = await deleteGameAndReviewsFromUser($userStore, game, dlcs);
				$userStore = updatedUser;
				goto(`/library`);
			} catch (error) {
				console.error('Error updating data:', error.message);
			}
		} else {
			goto(`/login?redirectTo=/${$page.url.pathname + $page.url.search}`);
		}
	}

	function deleteModalActivation() {
		showModal = !showModal;
	}
</script>

<div class="gamePage__gameBG" style="background-image: url({background});" />

<Modal bind:open={showModal} size="sm" color="primary">
	<div class="text-center">
		<h3 class="gamePage__deleteGame-modalText">¿Estás seguro de que quieres borrar este juego?</h3>
		<br />
		<Button size="md" on:click={deleteGame}>Si, borrarlo</Button>
		<Button color="alternative" size="md" on:click={deleteModalActivation}>No, mantenlo</Button>
	</div>
</Modal>

<div class="gamePage__deleteGame" on:click={deleteModalActivation}>
	<span class="gamePage__deleteGame-text">Borrar juego</span>
</div>

<div class="gamePage__mainInfo">
	<Cover {cover} />
	<div class="gamePage__libInfo">
		<GameTitle title={game.name} />
		<UserPlayInfo {game} {buydate} />
	</div>
</div>

<style lang="scss">
	* {
		animation-name: fadein;
		animation-duration: var(--seconds-fadein);
		animation-timing-function: ease-in;
		color: white;
	}
	.gamePage__deleteGame {
		position: absolute;
		background-color: red;
		top: 15%;
		right: 5%;
		padding: 10px;
		clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
		cursor: pointer;
		z-index: 1;
		&-modalText {
			color: var(--text-color);
			font-size: 1.5rem;
		}
	}
	.gamePage__gameBG {
		height: 60vh;
		background-repeat: space;
		background-size: cover;
		filter: blur(0.5rem);
		position: relative;
		margin: 0px 0px 0px -25px;
		transition: all 0.25s ease-in-out;

		@media (max-width: 800px) {
			height: 90vh;
			transition: all 0.25s ease-in-out;
		}
	}
	.gamePage__mainInfo {
		position: absolute;
		width: 100%;
		display: flex;
		justify-content: space-around;
		transform: translate(0%, 50%);
		top: 0%;
		transition: all 0.25s ease-in-out;
		@media (max-width: 800px) {
			flex-direction: column;
			align-items: center;
			height: 800px;
			transform: translate(0, 20%);
			justify-content: space-evenly;
			transition: all 0.25s ease-in-out;
		}
	}
	.gamePage__libInfo {
		display: grid;
		grid-template-rows: 1fr 1fr;
	}
</style>
