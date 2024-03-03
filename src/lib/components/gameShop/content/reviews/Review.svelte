<script>
	import GameShopTextField from '$lib/utils/GameShopTextField.svelte';
	export let user;
	export let value;
	export let title;
	export let content;
</script>

<div class="review">
	<div class="review__header">
		<div class="review__user">
			<GameShopTextField content={user} font_size="2rem" darkBG={true} />
		</div>
		<div class="review__value">
			{#if value}
				<object
					title="review_good"
					class="genre__svg"
					data="/svgs/rating_good.svg"
					type="image/svg+xml"
					width="100%"
					height="100%"
				/>
			{:else}
				<object
					title="review_bad"
					class="genre__svg"
					data="/svgs/rating_bad.svg"
					type="image/svg+xml"
					width="100%"
					height="100%"
				/>
			{/if}
		</div>
	</div>
	<div class="review__content">
		<GameShopTextField {title} {content} darkBG={true} />
	</div>
</div>

<style lang="scss">
	.review {
		box-sizing: border-box;
		background-color: var(--game-title-color-center);
	}
	.review__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		height: 5rem;
		border: 1px solid var(--text-color);
		background-color: var(--gamepage-playinfo-bg-color);
	}
	.review__value {
		max-width: 20%;
		padding: 0.5rem;
		height: 100%;
		display: flex;
		justify-content: flex-end;
	}
	.review__content {
		padding: 1rem;
	}
	.review__user {
		padding: 1rem;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
