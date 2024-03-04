<script>
	import { RingLoader } from 'svelte-loading-spinners';
	import GameShopTextField from '$lib/utils/GameShopTextField.svelte';
</script>

<div class="loading">
	<div>
		<GameShopTextField title="Cargando" content="Esperese una poquita de tiempo" />
	</div>

	<div>
		<RingLoader size="150" color="#d13364" unit="px" duration="2s" />
	</div>
</div>

<style lang="scss">
	.loading {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
