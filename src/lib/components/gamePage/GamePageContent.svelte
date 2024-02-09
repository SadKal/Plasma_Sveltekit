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
<Modal bind:open={showModal} size="xl" color="primary" outsideclose="true">
	<img src="https://images.igdb.com/igdb/image/upload/t_original/{imgID}.jpg">
</Modal>
<div class="gamePage__screenshots">
	<div class="gamePage__screenshots-title">
		<span>Tus capturas de pantalla:</span>
	</div>
	<div class="gamePage__screenshots-gallery">
		{#if game.screenshots.length === 0 || game.hoursplayed === 0}
			<span>No hay capturas de pantalla disponibles :(</span>
		{:else}
			{#each game.screenshots as screenshot (screenshot.image_id)}
				<img id={screenshot.image_id}
					src="https://images.igdb.com/igdb/image/upload/t_original/{screenshot.image_id}.jpg"
					on:click={() => (modalActivation(screenshot.image_id))}
				/>
			{/each}
		{/if}
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
			background-color: var(--gallery-background-color-center);
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
			grid-gap: 30px;
			margin: 0px 30px 30px 30px;
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
			& span {
				font-size: 1.5rem;
				font-weight: 700;
				margin: 10px;
			}
		}
	}
</style>
