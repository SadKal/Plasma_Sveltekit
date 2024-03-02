<script>
	import GameShopTextField from '../../../../utils/GameShopTextField.svelte';

	export let game;

	let showTrailer;
</script>

{#if game.videos}
	<div class="shopGame__trailer">
		<div class="shopGame__trailer__title" on:click={() => (showTrailer = !showTrailer)}>
			<GameShopTextField title="Trailer:" />
			<span class="shopGame__trailer__show" class:active={showTrailer}>&lt</span>
		</div>

		<div class="trailer" class:active={showTrailer}>
			<iframe
				width="100%"
				height="100%"
				src="https://www.youtube.com/embed/{game.videos[0].video_id}"
				title="Game trailer"
				importance="low"
				allowfullscreen
			></iframe>
		</div>
	</div>
{/if}

<style lang="scss">
	.shopGame__trailer {
		box-sizing: border-box;
		background-color: var(--cart-buy-bg-color);
		padding: 0.4rem 0 0 0;
		&__title {
			margin-left: 1rem;
			display: flex;
			justify-content: space-between;
			align-items: center;

			&:hover {
				cursor: pointer;
			}
		}
		&__show {
			box-sizing: border-box;
			color: var(--text-color);
			font-weight: 900;
			padding: 0.4rem;
			font-size: 2rem;
			margin-right: 2rem;
			transition: all 0.3s;

			&.active {
				transform: rotate(-90deg);
			}
		}
	}

	.trailer {
		box-sizing: border-box;
		padding: 0.4rem;
		opacity: 0;
		background-color: var(--game-title-color-center);
		width: 100%;
		height: 0;
		transition: all 0.3s;

		&.active {
			opacity: 100%;
			height: 40rem;
			@media (max-width: 1700px) {
				height: 30rem;
			}
			@media (max-width: 1250px) {
				height: 20rem;
			}
		}
	}
</style>
