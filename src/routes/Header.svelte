<script>
	import HeaderElement from './HeaderElement.svelte';
	import Cart from '$lib/components/cart/Cart.svelte';
	import { page } from '$app/stores'; //Lo cojo para coger la ruta en la que estoy y los datos asociados a esta ruta.
	export let login = false;

	let iconSrc = '/plasma_icon_notext.png';
	let iconLogin = '/login/login.png';
	let iconLogout = '/login/logout.png';
</script>

<div class="topbar">
	<div class="topbar__element--container">
		<img src={iconSrc} alt="logo" class="topbar__logo" />
	</div>
	<HeaderElement name="Inicio" />
	<HeaderElement name="Biblioteca" subdirectory="/library" />
	<HeaderElement name="Perfil" subdirectory="/profile" />

	{#if login?.userFound === false}
		<div class="topbar__element--container">
			<a href="/login?redirectTo={$page.url.pathname}">
				<img src={iconLogin} alt="login logo" class="topbar__logo" />
			</a>
		</div>
	{:else}
		<!--Al no estar en la ruta de login el action tiene que indicar la ruta y la acción-->
		<div class="topbar__element--container">
			<form method="POST" action="/login?/logout&redirectTo={$page.url.pathname}">
				<button type="submit" class="custom">
					<img src={iconLogout} alt="logout logo" class="topbar__logo" />
				</button>
			</form>
		</div>
	{/if}

	<Cart />
</div>

<style lang="scss">
	.topbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 6rem;
		box-sizing: border-box;
		border-bottom: 6px solid var(--text-color);
		background-color: var(--topbar-background-color);
		/*Necesitamos usarlo ya que si no las imagenes del slideshow apareceria por encima*/
		z-index: 100;
		position: sticky;
		top: 0;
		z-index: 100;

		&__logo {
			width: 45px;
			height: auto;
			margin: 0 1rem;

		}
	}
	button {
		background: transparent;
		border: none;
		margin: 0;
	}
</style>
