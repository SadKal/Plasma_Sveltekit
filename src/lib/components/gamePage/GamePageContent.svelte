<script>
	import { Modal } from 'flowbite-svelte';
	export let game;
	let showModal = false;

	function modalActivation(id){
		imgID = id;
		showModal = true;
		return id;	
	}
	let imgID = null;

</script>
{#if ( 
	(((game.platforms.includes(3)) | game.platforms.includes(6)) && ((game.platforms.includes(34) | game.platforms.includes(39))) 
	) ) }
<Modal bind:open={showModal} size="xl" color="primary" outsideclose="true">
	<img src="https://images.igdb.com/igdb/image/upload/t_original/{imgID}.jpg">
</Modal>
{:else if ( 
	(!((game.platforms.includes(3)) | game.platforms.includes(6)) && ((game.platforms.includes(34) | game.platforms.includes(39))) 
	) ) }
	<Modal bind:open={showModal} size="sm" color="primary" outsideclose="true">
		<img src="https://images.igdb.com/igdb/image/upload/t_original/{imgID}.jpg">
	</Modal>
{:else}
<Modal bind:open={showModal} size="xl" color="primary" outsideclose="true">
	<img src="https://images.igdb.com/igdb/image/upload/t_original/{imgID}.jpg">
</Modal>
{/if}

<div class="gamePage__screenshots">
	<div class="gamePage__screenshots-title">
		<span>Capturas de pantalla:</span>
	</div>
	<div class="gamePage__screenshots-gallery">
			{#each game.screenshots as screenshot (screenshot.image_id)}
				<img id={screenshot.image_id}
					src="https://images.igdb.com/igdb/image/upload/t_original/{screenshot.image_id}.jpg"
					on:click={() => (modalActivation(screenshot.image_id))}
				/>
			{/each}
	</div>
</div>

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
			grid-gap: 30px;
			margin: 0px 30px 30px 30px;
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
	}
</style>
