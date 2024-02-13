<script>
	import DLC from './DLC.svelte';
	export let dlcs;
</script>

<div class="dlcs">
	{#each dlcs as dlc}
		<div>
			<DLC {dlc} />
		</div>
	{/each}
</div>

<style lang="scss">
	.dlcs {
		display: grid;
		grid-template-columns: repeat(auto-fit, 200px);
		justify-content: space-around;

		height: 20rem;
		overflow-y: scroll;
		box-sizing: border-radius;
		border: 1rem solid var(--game-title-color-center);
		border-right: none;
		padding: 1rem;

		background-color: var(--game-title-color-center);

		-webkit-mask-image: -webkit-gradient(
			linear,
			left top,
			left bottom,
			from(rgba(0, 0, 0, 1)),
			to(rgba(0, 0, 0, 0.6))
		);
		mask-image: -webkit-gradient(
			linear,
			left top,
			left bottom,
			from(rgba(0, 0, 0, 1)),
			to(rgba(0, 0, 0, 0.6))
		);
	}
</style>
