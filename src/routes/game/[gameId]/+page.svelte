<script>
	import ShopPageContent from '$lib/components/gameShop/ShopPageContent.svelte';
	import { page } from '$app/stores';
	import ShopPageHeader from '../../../lib/components/gameShop/ShopPageHeader.svelte';

	export let data;

	$: ({ game, gamesFromSeries } = data);
</script>

{#key game}
	<div class="shopPage">
		<ShopPageHeader {game} />

		<ShopPageContent {game} {gamesFromSeries} />
	</div>
{/key}
