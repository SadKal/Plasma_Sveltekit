<script>
<<<<<<< HEAD
    import './styles.css';
    import Header from './Header.svelte';
    import Footer from './Footer.svelte';
    import libraryStore from "$lib/stores/library";
    import games from "$lib/data/games.json"
	import { onMount } from "svelte";
    export let data;
=======
	import { navigating, page } from '$app/stores';
	import { RingLoader } from 'svelte-loading-spinners';
	import '../app.pcss';
	import './styles.css';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import GameShopTextField from '$lib/components/gameShop/GameShopTextField.svelte';
	import { useUser } from '$lib/stores/user';
>>>>>>> refs/remotes/origin/main

	export let data;
	const userStore = useUser();
	$userStore = data;

	$: title = $navigating ? 'Cargando' : $page.data?.game ? $page.data.game.name : 'Plasma';
</script>

<<<<<<< HEAD
<div class="app">
    <Header login={data.username}/>
    <slot/>
    <Footer />
</div>
=======
<svelte:head>
	<title>{title}</title>
</svelte:head>

{#if $navigating}
	<div class="loading">
		<div>
			<GameShopTextField title="Cargando" content="Esperese una poquita de tiempo" />
		</div>

		<div>
			<RingLoader size="150" color="#d13364" unit="px" duration="2s" />
		</div>
	</div>
{:else}
	<div class="app">
		<Header></Header>
		<slot />
		<Footer></Footer>
	</div>
{/if}
>>>>>>> refs/remotes/origin/main

<style lang="scss">
	.loading {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
