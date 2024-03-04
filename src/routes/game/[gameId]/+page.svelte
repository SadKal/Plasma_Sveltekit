<script>
	import ShopPageContent from '$lib/components/gameShop/content/ShopPageContent.svelte';
	import ShopPageHeader from '$lib/components/gameShop/ShopPageHeader.svelte';

	export let data;

	$: ({ game, dlcs, gamesFromSeries, reviews } = data);
</script>

{#key game}
	<div class="shopPage">
		<ShopPageHeader {game} />

		<ShopPageContent {game} {dlcs} {gamesFromSeries} {reviews} />
	</div>
{/key}
