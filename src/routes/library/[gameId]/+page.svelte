<script>
	import GamePageContent from '$lib/components/gamePage/GamePageContent.svelte';
	import GamePageHeader from '$lib/components/gamePage/GamePageHeader.svelte';
	import GamePagePlayInfo from '../../../lib/components/gamePage/GamePagePlayInfo.svelte';
	export let data;

	let { game, dlcs } = data;
</script>
<GamePageHeader {game}/>

<GamePagePlayInfo {game} />

<GamePageContent {game} {dlcs} />

<style lang="scss">
	* {
		animation-name: fadein;
		animation-duration: var(--seconds-fadein);
		animation-timing-function: ease-in;
	}
</style>
