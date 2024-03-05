<script>
	import { goto } from '$app/navigation';
	export let currentSort;
	export let currentGenre;

	function changeSort(event) {
		const sort = event.target.value;
		goto(`/genres/${currentGenre[0] + '-' + currentGenre[1]}?page=0&sort=${sort}`);
	}
</script>

<div class="genres__radioSort">
	Ordenar por
	<div>
		<input
			on:change={changeSort}
			id="sortName"
			type="radio"
			name="sort"
			value="name"
			bind:group={currentSort}
		/>
		<label for="sortName">Nombre</label>
	</div>
	<div>
		<input
			on:change={changeSort}
			id="sortDate"
			type="radio"
			name="sort"
			value="first_release_date"
			bind:group={currentSort}
		/>
		<label for="sortDate">Fecha</label>
	</div>
	<div>
		<input
			on:change={changeSort}
			id="sortRating"
			type="radio"
			name="sort"
			value="total_rating"
			bind:group={currentSort}
		/>
		<label for="sortRating">Puntuación</label>
	</div>
</div>

<style lang="scss">
	.genres__radioSort {
		padding: 1rem;
		color: lightgray;
		display: flex;
		gap: 2rem;
		margin-top: 6rem;
		background-color: var(--text-color);
		font-size: 1.3rem;
		font-weight: 600;
	}
</style>
