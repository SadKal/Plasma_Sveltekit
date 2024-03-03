<script>
	import ShopPageContent from '$lib/components/gameShop/content/ShopPageContent.svelte';
	import ShopPageHeader from '$lib/components/gameShop/ShopPageHeader.svelte';
	import { useUser } from '$lib/stores/user';

	export let data;

	const userStore = useUser();
	$: ({ game, dlcs, gamesFromSeries, reviews, user } = data);

	$: $userStore = user;
</script>

{#key game}
	<div class="shopPage">
		<ShopPageHeader {game} />

		<ShopPageContent {game} {dlcs} {gamesFromSeries} {reviews} />
	</div>
{/key}
