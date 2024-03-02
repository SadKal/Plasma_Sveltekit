<script>
	export let game;
	export let gamesFromSeries;
	import GameFromSeries from './GameFromSeries.svelte';
	import GameShopTextField from '../../../../utils/GameShopTextField.svelte';
</script>

{#if gamesFromSeries.length > 0}
	<div class="shopGame__series">
		<GameShopTextField title="Saga:" content={game.collections[0].name} />

		<div class="shopGame__seriesGames">
			{#each gamesFromSeries as gameFromSeries (gameFromSeries.id)}
				<GameFromSeries game={gameFromSeries} />
			{/each}
		</div>
	</div>
{/if}

<style lang="scss">
	.shopGame__seriesGames {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		height: 20rem;
		overflow-y: scroll;
	}
</style>
