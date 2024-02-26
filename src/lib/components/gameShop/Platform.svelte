<script>
	import GameShopTextField from './GameShopTextField.svelte';
	export let platform;

	const logo = platform?.platform_logo?.image_id
		? `https://images.igdb.com/igdb/image/upload/t_cover_big/${platform.platform_logo.image_id}.png`
		: '/images_not_available/no_cover_available.jpg';
</script>

<div class="platform">
	<img class="platform__logo" src={logo} alt="logo" />
	<GameShopTextField content={platform.name} />
</div>

<style lang="scss">
	.platform {
		padding: 1rem 5rem;
		// clip-path: polygon(5% 0, 100% 0%, 95% 100%, 0% 100%);
		background-color: rgba(0, 74, 64, 0.5);
		display: grid;
		justify-content: center;
		align-items: center;
		justify-items: center;
		width: 100%;

		&__logo {
			margin-right: 1rem;
			max-height: 3rem;
		}
		transition: all 0.3s;

		&:hover {
			background-color: rgb(0, 74, 64);
		}
	}
</style>
