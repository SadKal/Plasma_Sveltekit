<script>
	import Select from "./GameListSelect.svelte";
	import { flip } from "svelte/animate";
	import { expoInOut } from "svelte/easing";
	import { goto } from '$app/navigation';

	export let games;

	sortBy("Nombre");

	function sortBy(selectedValue) {
		if (selectedValue === "Nombre") {
			games.sort((a, b) => {
				if (a.name < b.name) return -1;
				if (a.name > b.name) return 1;
				if (a.name === b.name) return 0;
			});
		}
		if (selectedValue === "Más jugados") {
			games.sort((a, b) => {
				return -(a.hoursplayed - b.hoursplayed);
			});
		}
		if (selectedValue === "Fecha adq.") {
			games.sort((a, b) => {
				return -(a.buydate - b.buydate);
			});
		}
		games = games;
	}
</script>

<div class="gamelist__title">
	<span class="library--urgames__title">Tus juegos</span>
	<Select
		label="Ordenar por"
		values={["Nombre", "Más jugados", "Fecha adq."]}
		selectedValue="Nombre"
		eventClick={sortBy}
	/>
</div>

<div class="gamelist__container">
	{#each games as game (game.id)}
		<div
			class="gamelist__content"
			style="background-image: url('https://images.igdb.com/igdb/image/upload/t_cover_big/{game.cover.image_id}.png');"
			animate:flip={{ duration: 400, delay: game.id/1000, easing: expoInOut }}
			on:click={goto(`/library/${game.id}`)}
		>
			<span class="gamelist__content_title" on:click={goto(`/library/${game.id}`)}>
				{game.name}
			</span>
		</div>
	{/each}
</div>

<style lang="scss">
	.gamelist__title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-right: 2%; //select aligned with thumbnails
		}
	.gamelist__container {
		display: flex;
		flex-wrap: wrap;
		margin-top: 20px;
		justify-content: start;
		cursor: pointer
	}
	.gamelist__content {
		height: 21vw;
		width: 18%;
		display: flex;
		margin-bottom: 10px;
		margin-right: 2%;
		background-size: contain;
		background-repeat: round;
		margin-top: 1.5rem;
		border-radius: 4px;
		transition: all 0.2s;
		cursor: pointer;
		&:hover,
		&:active {
			scale: 1.05;
			transition: all 0.4s;
		}
		&:hover &_title {
			opacity: 95%;
			transition-duration: 0.75s;
		}

		&_title {
			display: flex;
			height: fit-content;
			align-self: center;
			padding: 5% 10%;
			position: relative;
			text-align: center;
			font-size: 1.2rem;
			opacity: 0;
			clip-path: polygon(0 0, 100% 0%, 90% 100%, 0% 100%);
			background-color: var(--topbar-background-color);
			color: var(--selected-text-color);
			font-weight: 900;
			transition: all 0.25s;
			transition-duration: 0.25s;
			margin: 100% 0 0 -1px; //needed to make the title stay flush to the side, is there really no better way?

			@media (max-width: 600px) {
			font-size: .9rem;
			
		}
		}
		@media (max-width: 1750px) and (orientation: landscape) {
			height: 28vw;
			width: 23%;
		}
		@media (max-width: 1366px) and (orientation: landscape) {
			width: 31%;
			height: 36vw;
		}
		@media (max-width: 1080px) and (orientation: portrait) {
			width: 46%;
			height: 54vw;
		}
	}
	.library--urgames__title {
		font-weight: 600;
		color: var(--text-color);
		font-size: 4rem;
		letter-spacing: 1px;
		display: flex;
		@media (max-width: 1080px) and (orientation: portrait) {
			font-size: 2rem;
		}

	}
</style>
