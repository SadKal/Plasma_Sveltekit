<script>
	import Cover from '$lib/utils/Cover.svelte';

	export let dlc;
	let cover;
	if (dlc?.cover?.image_id) {
		cover = `https://images.igdb.com/igdb/image/upload/t_cover_big/${dlc.cover.image_id}.png`;
	} else {
		cover = '/images_not_available/no_cover_available.jpg';
	}
</script>

<a href="/game/{dlc.id}">
	<div class="dlcs__dlc">
		<span class="dlcs__dlc__title">{dlc.name}</span>
		<Cover {cover} height="220px" width="auto" />
	</div>
</a>

<style lang="scss">
	.dlcs__dlc {
		margin: 0.5rem;
		transition: all 0.2s linear;

		&:hover {
			cursor: pointer;
			box-shadow: 0 0 10px 2px lightgray;
			scale: 110%;
		}

		&__title {
			display: flex;
			align-items: center;
			opacity: 0;
			transition: all 0.3s;
			position: absolute;
			bottom: 10%;

			box-sizing: border-box;
			max-height: 100%;

			color: var(--selected-text-color);
			background-color: var(--game-title-color-center);
			padding: 0.3rem 2rem 0.3rem 0.3rem;
			clip-path: polygon(0 0, 100% 0%, 75% 100%, 0% 100%);

			transition: all 0.3s;
		}
	}
	.dlcs__dlc:hover .dlcs__dlc__title {
		opacity: 100%;
	}
</style>
