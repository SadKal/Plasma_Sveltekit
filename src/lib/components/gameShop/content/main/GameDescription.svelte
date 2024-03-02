<script>
	import GameShopTextField from '$lib/utils/GameShopTextField.svelte';
	import Companies from '$lib/components/gameShop/content/main/companies/Companies.svelte';

	export let game;
	let localizations = [];

	if (game.game_localizations) {
		game.game_localizations.forEach((loc) => {
			localizations.push(loc.name);
		});
	}
</script>

<div class="shopGame__gameDescription">
	{#if game.summary}
		<GameShopTextField title="Descripción:" content={game.summary} darkBG={true} />
	{/if}
	{#if game.storyline}
		<GameShopTextField title="Sinopsis:" content={game.storyline} darkBG={true} />
	{/if}
	<Companies {game} />
	{#if game.game_localizations}
		<GameShopTextField title="Títulos internacionales:" content={localizations} darkBG={true} />
	{/if}
</div>

<style lang="scss">
	.shopGame__gameDescription {
		box-sizing: border-box;
		background-color: var(--cart-buy-bg-color);

		padding: 1rem 6rem 1rem 2rem;
	}
</style>
