<script>
	import GameShopTextField from '$lib/utils/GameShopTextField.svelte';

	export let data;
	let currentReview = data;
	let rating = currentReview.value ? 'positive' : 'negative';
</script>

<div class="review-form-container">
	<form method="POST" class="review-form" id="review-form" action="">
		<div class="review-form__main">
			<GameShopTextField title="Edita esta reseña:" />
			<input type="hidden" name="id" value={currentReview.id} />
			<input
				type="text"
				name="title"
				placeholder="Título de la review"
				value={currentReview.title}
				required
			/>

			<textarea
				name="content"
				placeholder="Cuéntanos tus pensamientos sobre el juego"
				cols="40"
				rows="5"
				value={currentReview.content}
				required
			/>
		</div>
		<div class="review-form__secondary">
			<GameShopTextField title="¿Que opinas del juego?" />

			<div class="review-form__opinions">
				<input
					type="radio"
					id="positiveRadio"
					name="review-value"
					value="positive"
					bind:group={rating}
				/>
				<label for="positiveRadio" class="positiveLabel"></label>

				<input
					type="radio"
					id="negativeRadio"
					name="review-value"
					value="negative"
					bind:group={rating}
				/>
				<label for="negativeRadio" class="negativeLabel"></label>
			</div>
		</div>
	</form>

	<div class="review-form__submit__container">
		<button type="submit" form="review-form" class="review-form__submit">Actualizar reseña</button>
	</div>
</div>

<style lang="scss">
	.review-form-container {
		margin: 5rem auto;
		padding: 3rem;
		width: 70%;
		background-color: var(--game-title-color-center);
		display: flex;
		flex-direction: column;

		@media (max-width: 1000px) {
			width: 90%;
		}
	}
	.review-form {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
		column-gap: 5rem;
		row-gap: 1rem;
	}

	input,
	textarea {
		background-color: var(--gamepage-playinfo-bg-color);
		border: 0;
		color: var(--subtitle-text-color);
		font-weight: 600;
		font-size: 2rem;

		&::placeholder {
			color: var(--text-color);
			font-weight: 100;
		}

		&:focus,
		&:hover {
			background-color: var(--gamepage-playinfo-bg-color-low-opacity);
			border: 1px solid var(--subtitle-text-color);
		}

		&[type='radio'] {
			display: none;
		}
	}
	textarea {
		color: white;
		resize: none;
		line-height: 2rem;
	}

	.review-form__main {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1rem;
		overflow: hidden;
	}
	.review-form__secondary {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}
	.review-form__opinions {
		display: flex;
		width: 100%;
		justify-content: space-evenly;
		gap: 1rem;
	}

	.positiveLabel,
	.negativeLabel {
		display: inline-block;
		width: 5rem;
		height: 5rem;

		background-size: cover;
	}
	.positiveLabel {
		background-image: url('/svgs/rating_good_unchecked.svg');
		&:hover {
			background-image: url('/svgs/rating_good.svg');
			cursor: pointer;
		}
	}
	.negativeLabel {
		background-image: url('/svgs/rating_bad_unchecked.svg');
		&:hover {
			background-image: url('/svgs/rating_bad.svg');
			cursor: pointer;
		}
	}
	input[type='radio']:checked + .positiveLabel {
		background-image: url('/svgs/rating_good.svg');
		filter: drop-shadow(0 0 1rem white);
	}
	input[type='radio']:checked + .negativeLabel {
		background-image: url('/svgs/rating_bad.svg');
		filter: drop-shadow(0 0 1rem white);
	}

	.review-form__submit {
		background-color: var(--cart-buy-bg-color);
		color: white;
		font-weight: 600;
		font-size: 2rem;
		padding: 1rem;
		clip-path: polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%);
		transition: all 0.3s;
		&:hover {
			transform: scale(1.1);
			color: var(--text-color);
			background-color: var(--subtitle-text-color);
		}
	}
	.review-form__submit__container {
		margin-top: 3rem;
		display: flex;
		justify-content: center;
	}
</style>
