<script>
	import { Modal } from 'flowbite-svelte';
	import { goto } from '$app/navigation';
	import Cover from '../../utils/Cover.svelte';
	export let game;
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
		<img src="https://images.igdb.com/igdb/image/upload/t_original/{imgID}.jpg" />
	</Modal>
{:else if !(game.platforms.includes(3) | game.platforms.includes(6)) && game.platforms.includes(34) | game.platforms.includes(39)}
	<Modal bind:open={showModal} size="sm" color="primary" outsideclose="true">
		<img src="https://images.igdb.com/igdb/image/upload/t_original/{imgID}.jpg" />
	</Modal>
{:else}
	<Modal bind:open={showModal} size="xl" color="primary" outsideclose="true">
		<img src="https://images.igdb.com/igdb/image/upload/t_original/{imgID}.jpg" />
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
				src="https://images.igdb.com/igdb/image/upload/t_original/{screenshot.image_id}.jpg"
				on:click={() => modalActivation(screenshot.image_id)}
			/>
		{/each}
	</div>
</div>
<!-- svelte-ignore empty-block -->
{#if game.extracontent.length === 0}{:else}
	<div class="gamePage__extraContent">
		<div class="gamePage__extraContent-title">
			<span>DLCs disponibles:</span>
		</div>
		<div class="gamePage__extraContent-gallery">
			{#each game.extracontent as extra (extra.id)}
				<span>
					{(cover = `https://images.igdb.com/igdb/image/upload/t_cover_big/${extra.cover.image_id}.png`)}
				</span>
				<div class="gamePage__extraContent-cover" on:click={() => goto(`/game/${extra.id}`)}>
					<Cover {cover} />
					<div class="gamePage__extraContent-name">{extra.name}</div>
				</div>
			{/each}
		</div>
	</div>
{/if}

<style lang="scss">
	.gamePage__screenshots {
		background-color: var(--text-color);
		padding-bottom: 10px;
		&-title {
			font-size: 3rem;
			font-weight: 700;
			padding: 30px;
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
		&-title {
			font-size: 3rem;
			font-weight: 700;
			padding: 30px;
		}
		&-gallery {
			border: 20px solid var(--game-title-color-center);
			background-color: var(--game-title-color-center);
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
			gap: 50px;
			justify-content: space-around;
			justify-items: center;
			margin: 0px 30px 30px 30px;
			max-height: 50vh;
			overflow: scroll;
			span {
				display: none;
			}
		}
		&-cover {
				cursor: pointer;
				margin-top: 0rem;
				width: 300px;
				transition: all 0.25s ease-in-out;
				&::first-line{
					margin-top: 0;
				}
				&:hover {
					transform: scale(1.05);
					transition: all 0.25s ease-in-out;

					& .gamePage__extraContent-name {
						opacity: 100%;
						transition: all 0.6s;	
					}
				}
			}
		&-name {
		/* 	height: fit-content;
			padding: 5% 10%;
			position: relative;
			margin-top: -6rem;
			opacity: 0;
			text-align: center;
			font-size: 1.2rem;
			clip-path: polygon(0 0, 100% 0%, 90% 100%, 0% 100%);
			background-color: var(--topbar-background-color);
			color: var(--selected-text-color);
			font-weight: 900;
			transition: all 0.6s; */
			display: flex;
			height: fit-content;
			align-self: center;
			margin-top: -6rem;
			padding: 5% 10%;
			position: relative;
			text-align: center;
			font-size: 1.2rem;
			opacity: 0;
			clip-path: polygon(0 0, 100% 0%, 90% 100%, 0% 100%);
			background-color: var(--topbar-background-color);
			color: var(--selected-text-color);
			font-weight: 900;
			transition: all 0.25s;
			transition-duration: 0.25s;	
		}	
	}
</style>
