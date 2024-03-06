<script>
	import GameShopTextField from '$lib/utils/GameShopTextField.svelte';
	import { Modal, Button } from 'flowbite-svelte';
	import { goto } from '$app/navigation';

	export let user;
	export let value;
	export let title;
	export let content;
	export let userReview = false;
	export let game = '';

	let checkDeleting = false;
	function changeDeleting() {
		checkDeleting = !checkDeleting;
	}
	let checkEditing = false;
	function changeEditing() {
		checkEditing = !checkEditing;
	}
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
		{#if userReview}
			<div class="review__delete" on:click={changeDeleting}>
				<object
					class="delete-svg"
					title="delete"
					data="/svgs/delete_hover.svg"
					type="image/svg+xml"
					width="100%"
					height="100%"
				/>
			</div>
			<div class="review__edit" on:click={() => goto(`/game/${game.id}/editReview`)}>
				<object
					class="edit-svg"
					title="edit"
					data="/svgs/edit.svg"
					type="image/svg+xml"
					width="100%"
					height="100%"
				/>
			</div>
		{/if}
	</div>
	<div class="review__content">
		<GameShopTextField {title} {content} darkBG={true} />
	</div>
</div>

<Modal bind:open={checkDeleting} size="sm" color="primary">
	<div class="text-center">
		<h3 class="gamePage__deleteGame-modalText">¿Quieres borrar esta reseña?</h3>
		<br />
		<form method="POST" action="?/deleteReview">
			<Button type="submit" size="md">Si</Button>
			<Button color="alternative" size="md" on:click={changeDeleting}>No</Button>
		</form>
	</div>
</Modal>

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
	.review__value,
	.review__delete,
	.review__edit {
		max-width: 20%;
		padding: 0.5rem;
		height: 100%;
		display: flex;
		justify-content: flex-end;
		transition: all 0.3s;
	}
	.review__delete:hover,
	.review__edit:hover {
		pointer-events: all;
		z-index: 3;
		cursor: pointer;
		transform: scale(1.1);
	}
	.review__delete:hover {
		filter: drop-shadow(0 0 1rem #ff0000);
	}
	.review__edit:hover {
		filter: drop-shadow(0 0 1rem #2caaa0);
	}
	.delete-svg,
	.edit-svg {
		pointer-events: none;
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
