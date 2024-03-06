<script>
	import { Modal } from 'flowbite-svelte';
	import DLCS from '$lib/components/gameShop/content/main/DLCS/DLCS.svelte';

	export let game;
	export let dlcs;

	let imgID = null;
	let showModal = false;
	let cover = '/loading.gif';

	function modalActivation(id) {
		imgID = id;
		showModal = true;
		return id;
	}
</script>

{#if game.platforms.includes(3) | game.platforms.includes(6) && game.platforms.includes(34) | game.platforms.includes(39)}
	<Modal bind:open={showModal} size="xl" color="primary" outsideclose="true">
		<img src="https://images.igdb.com/igdb/image/upload/t_original/{imgID}.jpg" alt="Captura de pantalla de {game.name}"/>
	</Modal>
{:else if !(game.platforms.includes(3) | game.platforms.includes(6)) && game.platforms.includes(34) | game.platforms.includes(39)}
	<Modal bind:open={showModal} size="sm" color="primary" outsideclose="true">
		<img src="https://images.igdb.com/igdb/image/upload/t_original/{imgID}.jpg" alt="Captura de pantalla de {game.name}"/>
	</Modal>
{:else}
	<Modal bind:open={showModal} size="xl" color="primary" outsideclose="true">
		<img src="https://images.igdb.com/igdb/image/upload/t_original/{imgID}.jpg" alt="Captura de pantalla de {game.name}"/>
	</Modal>
{/if}

<div class="gamePage__screenshots">
	<div class="gamePage__screenshots-title">
		<span>Capturas de pantalla:</span>
	</div>
	<div class="gamePage__screenshots-gallery">
		{#each game.screenshots as screenshot (screenshot.image_id)}
			<img
				id={screenshot.image_id}
				src="https://images.igdb.com/igdb/image/upload/t_screenshot_med/{screenshot.image_id}.jpg"
				alt="Captura de pantalla de {game.name}"
				on:click={() => modalActivation(screenshot.image_id)}
			/>
		{/each}
	</div>
</div>
<!-- svelte-ignore empty-block -->
<div class="gamePage__extraContent">
	{#if dlcs.length === 0}
		<div class="gamePage__extraContent-noDLCS">
			<p>
				No tienes ningún contenido descargable para este juego.
				<a href="/game/{game.id}">Ir a la tienda?</a>
			</p>
		</div>
	{:else}
		<DLCS {dlcs} />
	{/if}
</div>

<style lang="scss">
	.gamePage__screenshots {
		color: white;
		background-color: var(--text-color);
		padding-bottom: 10px;

		&-title{
			padding: 20px;
			font-size: 3rem;
		}
		&-gallery {
			border: 20px solid var(--topbar-background-color);
			background-color: var(--topbar-background-color);
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
			gap: 30px;
			margin: 0px 30px 30px 30px;
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
				cursor: pointer;
				transition: 0.25s all ease-in-out;
				&:hover {
					transform: scale(1.05);
					transition: 0.25s all ease-in-out;
				}
			}
		}
	}
	.gamePage__extraContent {
		padding-bottom: 10px;
		color: white;
		width: 90%;
		margin: 0 auto;
		margin-top: 50px;
		&-noDLCS {
			width: 95%;
			margin: 0 auto;
			background-color: var(--topbar-background-color);

			& p {
				padding: 30px;
				font-size: 2rem;
				color: var(--selected-text-color);
				& a {
					color: white;
				}
			}
		}
	}
</style>
