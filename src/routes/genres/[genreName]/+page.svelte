<script>
	import GenreGame from '$lib/components/genres/GenreGame.svelte';
	import { goto, preloadData } from '$app/navigation';
	import GenresRadio from '$lib/components/genres/GenresRadio.svelte';

	export let data;

	const { genres, games, currentGenre, pagination, currentSort } = data;

	//Por como esta construido, el genero actual siempre estará arriba
	let genreList = [];
	$: genreList = genres.filter((genre) => genre.id != currentGenre[1]).sort();

	let selectedOption;
	let selectedGenre = genres?.find(
		(genre) => genre.id == currentGenre[1] && genre.kind == currentGenre[0]
	);

	function changeSelection(event) {
		selectedOption = event.target.value;
		goto(`/genres/${selectedOption}?page=0`);
	}

	function changePage(direction) {
		if (pagination != 1 || direction == 1 || games.length < 20) {
			const href = `/genres/${currentGenre[0] + '-' + currentGenre[1]}?page=${
				parseInt(pagination) + direction
			}`;
			preloadData(href);
			goto(href);
		}
	}
</script>

<!--Este key es solo para forzar el rerender para la animacion, funciona perfectamente sin el-->
{#key selectedOption}
	<div class="genres">
		<div class="genres__title">
			<select bind:value={selectedOption} on:input={changeSelection} class="genres__select">
				<option selected value={selectedGenre.id}>{selectedGenre.name}</option>

				{#each genreList as { id, name, kind } ((id, name))}
					<option value={kind + '-' + id}>{name}</option>
				{/each}
			</select>
		</div>
		<GenresRadio {currentSort} {currentGenre} />
		<div class="genres__game-list">
			{#each games as game}
				<GenreGame {game} />
			{/each}
		</div>

		<div class="genres__pagination">
			Página {pagination}
			<div class="genres__pagination__buttons">
				<div
					class="genres__pagination__previous"
					class:pageOne={pagination == 1}
					on:click={() => changePage(-1)}
				>
					&lt;
				</div>
				<div
					class="genres__pagination__next"
					class:pageMax={games.length < 20}
					on:click={() => changePage(1)}
				>
					&gt;
				</div>
			</div>
		</div>
	</div>
{/key}

<style lang="scss">
	option {
		background-color: var(--text-color);
		font-size: 1rem;
	}
	.genres__pagination {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 2rem;
		color: var(--text-color);
		font-size: 2rem;
		font-weight: 600;
	}
	.genres__pagination__buttons {
		display: flex;

		background-color: var(--topbar-background-color);
	}
	.genres__pagination__next,
	.genres__pagination__previous {
		cursor: pointer;
		transition: all 0.3s;
		padding: 0.3rem 0.7rem;
		&:hover {
			background-color: var(--cart-total-bg-color);
		}
	}
	.genres__pagination__previous.pageOne,
	.genres__pagination__next.pageMax {
		color: darkgray;
		&:hover {
			cursor: default;
			background-color: var(--topbar-background-color);
		}
	}

	.genres {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;

		animation: fadein var(--seconds-fadein) ease-in;

		&__select {
			text-align: center;
			background-color: transparent;
			border: none;
			width: 100%;
			font-family: inherit;
			font-size: inherit;
			font-style: italic;
			cursor: pointer;
			color: lightgray;
			&:focus {
				outline: none;
			}
		}
		&__title {
			box-sizing: border-box;
			position: fixed;
			margin-top: 0;
			width: 25rem;
			outline: none;

			padding: 1rem 2rem;
			font-weight: 700;
			background-color: var(--text-color);
			color: var(--game-title-color-center);

			clip-path: polygon(5% 0, 100% 0%, 95% 100%, 0% 100%);
			z-index: 20;
			font-size: 2rem;
			@media (max-width: 750px) {
				width: 55vw;
				font-size: 1.25rem;
			}
		}

		&__game-list {
			margin-top: 2rem;
			padding-bottom: 2rem;
		}
	}
</style>
