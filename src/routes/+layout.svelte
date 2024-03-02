<script>
	import { navigating, page } from '$app/stores';
	import { RingLoader } from 'svelte-loading-spinners';
	import '../app.pcss';
	import './styles.css';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import GameShopTextField from '$lib/utils/GameShopTextField.svelte';
	import { useUser } from '$lib/stores/user';
	import { useCart } from '$lib/stores/cart';
	import { onMount } from 'svelte';
	import { Alert } from 'flowbite-svelte';

	export let data;

	const userStore = useUser();
	const cartStore = useCart();

	$: $userStore = data;

	let cleanCartFlag = false;
	$: if ($userStore?.username) {
		for (let i = $cartStore.gamesInCart.length - 1; i >= 0; i--) {
			const game = $cartStore.gamesInCart[i];
			if ($userStore?.games?.some((libraryGame) => libraryGame.id === game.id)) {
				cartStore.removeGameFromCart(game);
				cleanCartFlag = true;
			}
		}
	}

	$: title = $navigating ? 'Cargando' : $page.data?.game ? $page.data.game.name : 'Plasma';
	onMount(() => {
		//Si no existe el valor del localstorage, le asigno un array vacio
		$cartStore.gamesInCart = JSON.parse(window.localStorage.getItem('cart'))
			? JSON.parse(window.localStorage.getItem('cart'))
			: [];
	});
</script>

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
		<Header login={data}></Header>
		{#if cleanCartFlag}
			<Alert
				dismissable
				on:close={() => (cleanCartFlag = false)}
				color="none"
				class="flex justify-center bg-pink-600 text-white"
			>
				<span>Se han eliminado del carrito los juegos que ya estaban en tu biblioteca</span>
			</Alert>
		{/if}
		<slot />
		<Footer></Footer>
	</div>
{/if}

<style lang="scss">
	.loading {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
