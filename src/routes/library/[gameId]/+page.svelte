<script>
	import { goto } from '$app/navigation';
	import GamePageContent from '$lib/components/gamePage/GamePageContent.svelte';
	export let data;

	let { game } = data;

	const allImages = [...game.artworks, ...game.screenshots];
	const random = Math.floor(Math.random() * allImages.length);
	const artwork = allImages[random];

	const roundedRating = Math.round(game.total_rating);
	const lastUpdate = new Date(game.updated_at * 1000).toISOString().slice(0, 10); //original example: 2024-01-26T23:29:28.000Z
	const releaseDate = new Date(game.first_release_date * 1000).toISOString().slice(0, 10); //slice para quedarnos solo con la fecha
	const buydate = new Date(game.buydate * 1000).toISOString().slice(0, 10);
</script>

<div
	class="gamePage__gameBG"
	style="background-image: url(https://images.igdb.com/igdb/image/upload/t_original/{artwork.image_id}.jpg);"
/>
<div class="gamePage__mainInfo">
	<div
		class="gamePage__coverArt"
		style="background-image: url(https://images.igdb.com/igdb/image/upload/t_cover_big/{game.cover
			.image_id}.png);"
	/>
	<div class="gamePage__libInfo">
		<div class="gamePage__title">
			<span>{game.name}</span>
		</div>
		<div class="gamePage__moreInfo">
			<div class="gamePage__moreInfo-hrsPlayed">
				<h4>Horas jugadas:</h4>
				<span>{game.hoursplayed}</span>
			</div>
			<div class="gamePage__moreInfo-buyDate">
				<h4>Comprado el:</h4>
				<span>{buydate}</span>
			</div>
		</div>
		<div class="gamePage__moreInfo-toShopPage" on:click={() => goto(`/game/${game.id}`)}>
			<p>Ir a la tienda</p>
		</div>
	</div>
</div>
<div class="gamePage__playInfo">
	<div class="gamePage__playInfo-rating">
		<p class="gamePage__playInfo-titles">Valoración media:</p>
		<span>{roundedRating}</span>
	</div>
	<div class="gamePage__playInfo-update">
		<p class="gamePage__playInfo-titles">Última actualización:</p>
		<span>{lastUpdate}</span>
	</div>
	<div class="gamePage__playInfo-launch">
		<p class="gamePage__playInfo-titles">Fecha de lanzamiento:</p>
		<span>{releaseDate}</span>
	</div>
</div>

<GamePageContent {game} />

<style lang="scss">
	* {
		animation-name: fadein;
		animation-duration: var(--seconds-fadein);
		animation-timing-function: ease-in;
	}
	.gamePage__gameBG {
		height: 60vh;
		background-repeat: space;
		background-size: cover;
		filter: blur(0.5rem);
		position: relative;
		margin: 0px 0px 0px -25px;
		@media (max-width: 650px) and (orientation: portrait) {
			height: 40vh;
		}
	}
	.gamePage__coverArt {
		height: 400px;
		width: 300px;
		top: 15%;
		left: 10%;
		background-size: cover;
		background-repeat: round;
		border-radius: 1%;
		transition: all 0.4s ease-in-out;
		@media (max-width: 1050px) and (orientation: portrait) {
			height: 400px;
			width: 300px;
		}
		@media (max-width: 650px) and (orientation: portrait) {
			height: 225px;
			width: 175px;
			top: 10%;
		}
		@media (min-width: 1500px) and (orientation: landscape) {
			height: 400px;
			width: 300px;
		}
		@media (max-height: 900px) and (orientation: landscape) {
			height: 300px;
			width: 225px;
			top: 10%;
		}
		@media (max-height: 600px) and (orientation: landscape) {
			height: 225px;
			width: 175px;
			top: 5%;
		}
	}
	.gamePage__mainInfo {
		position: absolute;
		width: 100%;
		display: flex;
		justify-content: space-around;
		transform: translate(0%, 50%);
		top: 0%;
	}
	.gamePage__libInfo {
		//breaks on 1400px
		display: grid;
		grid-template-rows: 1fr 1fr;
		width: 35%;
	}

	.gamePage__title {
		background-color: var(--game-title-background-color);
		color: var(--selected-text-color);
		padding: 0.75rem 4rem;
		width: fit-content;
		text-align: center;
		clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
		font-size: 3rem;
		align-self: start;
		justify-self: center;
		@media (max-width: 900px) and (orientation: portrait) {
			max-width: 25%;
			top: 15%;
		}
		@media (max-width: 650px) and (orientation: portrait) {
			font-size: 1.25rem;
			max-width: 30%;
			padding: 3% 7%;
		}
		@media (max-width: 450px) and (orientation: portrait) {
			font-size: 1rem;
		}
		@media (max-height: 900px) and (orientation: landscape) {
			top: 20%;
		}
		@media (max-height: 600px) and (orientation: landscape) {
			font-size: 1.5rem;
			max-width: 30%;
			top: 10%;
			padding: 1% 5%;
		}
	}
	.gamePage__moreInfo {
		display: flex;
		justify-content: space-between;
		background-color: var(--game-title-background-color);
		clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
		padding: 0.5rem 5rem;
		align-self: end;
		& span {
			font-size: 2rem;
			font-weight: 600;
			color: var(--selected-text-color);
			width: max-content;
		}
		& h4 {
			margin-top: 0.5rem;
			font-size: 1.25rem;
			margin-bottom: 0.5rem;
		}
		&:hover ~ .gamePage__moreInfo-toShopPage {
			max-height: 100px; //needed to make the transition, doesnt work with height
			transition: all 0.75s;
			clip-path: polygon(0% 0%, 90% 0%, 95% 100%, 5% 100%);
		}
	}
	.gamePage__moreInfo-toShopPage {
		background-color: var(--selected-text-color);
		max-height: 5px;
		font-size: 1.5rem;
		clip-path: polygon(0% 0%, 90% 0%, 90% 100%, 0% 100%);
		transition: all 0.75s;
		cursor: pointer;
		& p {
			margin: 10px 10px 10px 30px;
			color: var(--gamepage-playinfo-bg-color);
			font-weight: 700;
		}
		&:hover {
			max-height: 100px;
			transition: all 0.75s;
			clip-path: polygon(0% 0%, 90% 0%, 95% 100%, 5% 100%);
		}
	}
	.gamePage__playInfo {
		background-color: var(--gamepage-playinfo-bg-color);
		margin-top: -10px;
		position: relative;
		display: flex;
		justify-content: space-around;
		&-titles {
			font-size: 2rem;
			margin: 1rem 20px 1rem 0;
		}
		& span {
			font-size: 1.5rem;
			align-self: center;
			color: var(--selected-text-color);
			margin: 1.5rem 20px 1.5rem 0;
		}
		&-rating,
		&-update,
		&-launch {
			display: flex;
			width: fit-content;
		}
	}
</style>
