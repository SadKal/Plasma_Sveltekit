<script>
	import GameShopTextField from '$lib/utils/GameShopTextField.svelte';
	import { useUser } from '$lib/stores/user';
	import Review from './Review.svelte';
	import ReviewForm from './ReviewForm.svelte';
	import { page } from '$app/stores';

	export let reviews;
	export let game;

	const userStore = useUser();

	let gameReviews = reviews?.reviews;

	const parent = game?.parent_game;
	let gameOwned = false;
	$: if ($userStore?.games?.some((libraryGame) => libraryGame.id === game.id)) {
		gameOwned = true;
	} else if ($userStore?.games?.some((libraryGame) => libraryGame.id === parent?.id)) {
		const thisParent = $userStore?.games?.find((libraryGame) => libraryGame.id === parent.id);
		if (thisParent?.dlcs?.some((dlc) => dlc.id === game.id)) {
			gameOwned = true;
		}
	}
	let newReviewID;
	if (gameReviews) {
		newReviewID = gameReviews[gameReviews?.length - 1].id + 1 || 1;
	} else {
		newReviewID = 1;
	}

	const yourReview = gameReviews?.find((review) => review.user == $userStore?.username);
	gameReviews = gameReviews?.filter((review) => review.user != $userStore?.username);
</script>

<div class="reviews">
	<div class="reviews__title">
		<GameShopTextField title="Reseñas para {game.name}: " header_font_size="3rem" />
	</div>
	{#if yourReview}
		<div class="your-review">
			<Review
				title={yourReview.title}
				content={yourReview.content}
				value={yourReview.value}
				user={yourReview.user}
			/>
		</div>
	{:else if !gameOwned && $userStore?.username}
		<div class="reviews__empty">
			Para poder dejar una reseña primero debes tener el juego adquirido.
		</div>
	{:else if $userStore?.username}
		<ReviewForm {newReviewID} />
	{:else}
		<div class="reviews__empty">
			<a href="/login?redirectTo={$page.url.pathname}"> Inicia sesión para dejar una reseña </a>
		</div>
	{/if}

	{#if gameReviews?.length > 0}
		<div class="reviews__list">
			{#each gameReviews as { id, title, content, value, user } (id)}
				<Review {title} {content} {value} {user} />
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.reviews {
		width: 100%;
		margin: 2rem auto;
		margin-bottom: 0;
		box-sizing: border-box;
		padding: 2rem 1rem 5rem 1rem;
		background-color: var(--cart-buy-bg-color);
	}
	.reviews__list {
		margin-top: 2rem;
		display: grid;
		justify-content: center;
		grid-template-columns: repeat(auto-fit, 35rem);
		gap: 1rem;
		@media (max-width: 1000px) {
			grid-template-columns: repeat(auto-fit, 20rem);
			gap: 0.4rem;
		}
		@media (max-width: 700px) {
			grid-template-columns: repeat(auto-fit, 30rem);
			gap: 0.4rem;
		}
	}
	.reviews__title {
		display: flex;
		justify-content: center;
	}
	.your-review {
		margin-top: 2rem;
		display: flex;
		justify-content: center;
		padding: 0 5rem 0 5rem;
	}
	.reviews__empty {
		display: flex;
		justify-content: center;
		font-size: 3rem;
		color: var(--text-color);
		& a {
			text-decoration: underline;

			transition: all 0.3s;

			&:hover {
				color: white;
			}
		}
	}
</style>
