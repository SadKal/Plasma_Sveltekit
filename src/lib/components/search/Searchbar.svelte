<script>
	import games from '$lib/data/games.json';
	import SearchResult from './SearchResult.svelte';
	import { clickOutside } from '$lib/utils/outsideCart';

	let searchValue = '';
	let searchbar;
	let scrollY;
	let gameData = games.data;
	let searchResult = [];
	let test;

	//Ordeno alfabeticamente, para resultado mas bonito
	gameData.sort((a, b) => a.name.localeCompare(b.name));

	function debounce(callback, wait) {
		let timerId;
		return (...args) => {
			clearTimeout(timerId);
			timerId = setTimeout(() => {
				callback(...args);
			}, wait);
		};
	}

	const searchGames = debounce(async (textToSearch) => {
		if (textToSearch.trim() !== '') {
			const test = await fetch(`/api?q=${textToSearch}`, {
				method: 'GET',
				headers: {
					'content-type': 'application/json'
				}
			});
			const result = await test.json();
			searchResult = result;
		} else {
			searchResult = [];
		}
	}, 500);

	$: searchGames(searchValue);

	$: {
		if (searchValue === '') {
			searchResult = [];
		}
	}

	function scrollToSearch() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}
	function focusSearch() {
		scrollY = window.scrollY;
		if (scrollY === 0) {
			searchbar.focus();
		}
	}
	function clearFocus() {
		searchValue = '';
		searchResult = [];
	}
</script>

<svelte:window on:scroll={focusSearch} />

<div class="search__link" on:click={scrollToSearch} on:click={focusSearch}>
	<object data="/svgs/magnifier.svg" type="image/svg+xml" width="70%" height="auto" />
</div>

<div class="search__container" use:clickOutside on:click_outside={clearFocus}>
	<div class="search">
		<input
			bind:this={searchbar}
			class="search__bar"
			name="search"
			type="search"
			placeholder="Escribe para buscar..."
			bind:value={searchValue}
		/>
		<div class="search__results">
			{#await searchResult}
				Cargando...
			{:then}
				{#each searchResult as game (game.id)}
					<SearchResult {game} />
				{/each}
			{/await}
		</div>
	</div>
</div>

<style lang="scss">
	object {
		pointer-events: none;
	}
	.search {
		margin-top: 1.3rem;
		width: 80%;
		height: 5rem;
		z-index: 40;
		max-height: 10vw;

		@media (max-width: 420px) {
			width: 60%;
			left: 53%;
			top: 15%;
		}

		&__link {
			position: fixed;
			margin-top: 1.3rem;
			left: 1.5%;
			width: 4rem;
			cursor: pointer;
			display: block;
			z-index: 3;
			opacity: 50%;

			transition: all 0.3s;
			&:hover {
				scale: 130%;
				opacity: 100%;
			}

			@media (max-width: 420px) {
				left: 85%;
			}
		}

		&__container {
			width: 100%;
			display: flex;
			justify-content: center;
		}
		&__bar {
			width: 100%;
			padding: 0.5rem;
			background: var(--searchbar-background-color);
			border-radius: 0.3rem 0.3rem 0 0;
			border: none;
			outline: none;
			font-size: 20px;
			font-style: italic;
			font-weight: 400;
			font-family: 'Chakra Petch';
			color: var(--text-color);
			transition: all 0.3s;
			&:focus,
			&:hover {
				padding: 0.7rem;
				background: var(--searchbar-hover-background-color);
			}

			@media (max-width: 420px) {
				width: 100%;
				background-color: var(--search-mobile-color);
				&:focus,
				&:hover {
					background: var(--search-mobile-focus-color);
				}
			}
		}
		&__results {
			max-height: 20rem;
			overflow-y: auto;
		}
	}
</style>
