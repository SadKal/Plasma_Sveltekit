<script>
	import GenreGame from '$lib/components/genres/GenreGame.svelte';
	import { goto } from '$app/navigation';

	export let data;

	const { genres, games, currentGenre } = data;

	//Por como esta construido, el genero actual siempre estará arriba
	let genreList = [];
	$: genreList = genres.filter((genre) => genre.id != currentGenre[1]).sort();

	let selectedOption;
	let selectedGenre = genres?.find(
		(genre) => genre.id == currentGenre[1] && genre.kind == currentGenre[0]
	);

	function changeSelection(event) {
		selectedOption = event.target.value;
		goto(`/genres/${selectedOption}`);
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

		<div class="genres__game-list">
			{#each games as game}
				<GenreGame {game} />
			{/each}
		</div>
	</div>
{/key}

<style lang="scss">
	option {
		background-color: var(--text-color);
		font-size: 1.5rem;
		padding: 5rem;
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
			margin-top: 6rem;
			padding-bottom: 5rem;
		}
	}
</style>
