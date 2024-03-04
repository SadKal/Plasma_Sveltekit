<script>
	export let game;
	export let buydate;
	import { goto } from '$app/navigation';
</script>

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

<style lang="scss">
	.gamePage__moreInfo {
		display: flex;
		justify-content: space-between;
		background-color: var(--game-title-background-color);
		clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
		padding: 0.25rem 5rem;
		align-self: end;

		& span {
			font-size: 2rem;
			font-weight: 600;
			color: var(--selected-text-color);
			width: min-content;
		}
		& h4 {
			font-size: 1.25rem;
			margin: 0.5rem 0.25rem;
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
</style>
