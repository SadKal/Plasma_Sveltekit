<script>

	export let game;
	let genres = game.genres;
</script>

<div class="shopGame__content_container">
	<div class="shopGame__gameInfo">
		<div class="shopGame__nonTechInfo">
			<h1>Descripción:</h1>
			<p>
				<!-- will be changed once we get API access and can bring from there-->
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab consectetur
				mollitia expedita quae quod provident praesentium amet eligendi iste alias
				soluta dolorum earum voluptatem repellat magnam dolore, omnis animi magni!
			</p>
			<h2>Sinopsis:</h2>
			<p>
				<!-- will be changed once we get API access and can bring from there-->
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab consectetur
				mollitia expedita quae quod provident praesentium amet eligendi iste alias
				soluta dolorum earum voluptatem repellat magnam dolore, omnis animi magni!
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi fugit incidunt
				asperiores autem similique officiis temporibus inventore ipsam sunt. Eaque
				illum vero dolorem quo rem. Autem sunt delectus perferendis eum.
			</p>
		</div>
		<div class="shopGame__techInfo">
			<h2>Géneros:</h2>
			{#each genres as genre}
				<!-- ideally, clickable and will bring to genres-->
				<p>{genre}</p>
			{/each}
			<br />
		</div>
	</div>
</div>

<style lang="scss">
	* {
		animation-name: fadein;
		animation-duration: var(--seconds-fadein);
		animation-timing-function: ease-in;
	}
	h1,
	h2 {
		color: var(--subtitle-text-color);
	}
	p {
		color: var(--text-color);
		font-weight: 600;
		line-height: 140%;
		margin: 3px 0;
	}

	.shopGame__content_container {
		width: 100%;
		background: linear-gradient(
				130deg,
				rgba(0, 61, 53, 0.95) 40%,
				rgba(0, 0, 0, 0.95) 100%
			),
			url("/bg.png");
		background-attachment: fixed;
		z-index: 10;
		position: relative;
		margin-top: -1rem;
		margin-bottom: 10rem;
	}
	.shopGame__gameInfo {
		width: 80%;
		margin: 0 auto;
		padding-top: 2rem;
		display: flex;
		justify-content: space-between;
		@media (max-width: 750px) {
			display: block;
		}
	}
	.shopGame__nonTechInfo {
		width: 70%;
		border-right: 3px solid var(--game-data-bg-color);
		padding-right: 7.5%;
		@media (max-width: 750px) and (orientation: portrait) {
			width: 100%;
			border-right: none;
		}
	}
	.shopGame__techInfo {
		justify-content: flex-start;
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		align-items: flex-end;
		text-align: end;
		@media (max-width: 750px) {
			text-align: start;
			justify-content: start;
			width: 100%;
			border-right: none;
		}
	}
</style>
