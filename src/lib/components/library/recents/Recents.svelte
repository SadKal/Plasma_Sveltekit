<script>
	import Thumbnails from './Thumbnails.svelte';
	import { useUser } from '$lib/stores/user';

	const userStore = useUser();

	console.log($userStore);
	function sortRecent(a, b) {
		//Los mas recientes seran los que tengan el unix time mas alto
		return a.buydate < b.buydate ? 1 : -1;
		return 0;
	}
	let thumbnails = $userStore.games.slice().sort(sortRecent).slice(0, 5);
</script>

<div class="library--recents__title">Biblioteca de {$userStore.username}</div>
<div class="library--recents">
	<Thumbnails {thumbnails} />
</div>

<style lang="scss">
	* {
		animation-name: fadein;
		animation-duration: var(--seconds-fadein);
		animation-timing-function: ease-in;
	}
	.library--recents {
		border-bottom: 7px solid var(--text-color);
		padding-bottom: 75px;
		display: flex;
		&__title {
			margin: 75px 0px;
			text-align: center;
			font-size: 5rem;
			font-weight: 600;
			color: var(--text-color);
			letter-spacing: 1px;

			@media (max-width: 650px) and (orientation: portrait) {
				font-size: 4rem;
			}
			@media (max-width: 450px) and (orientation: portrait) {
				font-size: 3rem;
			}
		}
	}
</style>
