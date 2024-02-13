<script>
	import GameShopTextField from './GameShopTextField.svelte';
	export let company;
	const logo = company?.logo?.image_id
		? `https://images.igdb.com/igdb/image/upload/t_logo_med/${company.logo.image_id}.png`
		: '/images_not_available/no_cover_available.jpg';
</script>

<div class="company">
	<img class="company__logo" src={logo} alt="logo" />
	<GameShopTextField content={company.name} />
</div>

<style lang="scss">
	.company {
		margin-right: 1rem;
		display: flex;
		&__logo {
			margin-right: 1rem;
			height: 2rem;
		}
	}
</style>
