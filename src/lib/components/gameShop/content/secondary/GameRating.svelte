<script>
	import { Progressbar } from 'flowbite-svelte';
	import GameShopTextField from '../../../../utils/GameShopTextField.svelte';

	export let game;
</script>

<div class="shopGame__rating">
	{#if game.total_rating != undefined}
		<GameShopTextField
			title="Valoración:"
			content={Math.round(game.total_rating)}
			font_size="2.5rem"
		/>
		<Progressbar progress={game.total_rating} color="primary" size="h-5" />
	{:else}
		<GameShopTextField title="Este juego no tiene valoración." />
	{/if}
</div>

<style lang="scss">
	.shopGame__rating {
		color: var(--subtitle-text-color);
	}
</style>
