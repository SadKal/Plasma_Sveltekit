<script>
	import GameShopTextField from '$lib/utils/GameShopTextField.svelte';
	export let company;
	const logo = company?.logo?.image_id
		? `https://images.igdb.com/igdb/image/upload/t_logo_med/${company.logo.image_id}.png`
		: '/images_not_available/no_cover_available.jpg';
</script>

<div class="company">
	<img class="company__logo" src={logo} alt="logo" />
	<GameShopTextField content={company.name} font_size="1.5rem" darkBG={true} />
</div>

<style lang="scss">
	.company {
		margin-right: 1rem;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		&__logo {
			margin-right: 1rem;
			height: 2rem;
		}
	}
</style>
