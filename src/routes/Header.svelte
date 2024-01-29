<script>
	import HeaderElement from "./HeaderElement.svelte";
	import Cart from "$lib/components/cart/Cart.svelte";
	import { page } from '$app/stores'; //Lo cojo para coger la ruta en la que estoy y los datos asociados a esta ruta.
	import { goto, invalidateAll, preloadData } from '$app/navigation'; //Se usa para manejr la navegación y la precarga de los datos. INVALIDATEALL es para para invalidar y reforzar la recarga de los datos precargados en la pagina actual
	console.log($page.data.username);

	let iconSrc = "/plasma_icon_notext.png";
</script>

<div class="topbar clearfix">
	<ul class="topbar__list">
		<li class="topbar__element--container">
		<img src={iconSrc} alt="logo" class="topbar__logo" />
	</li>
		<HeaderElement name="Inicio" />
		<HeaderElement name="Biblioteca" subdirectory="/library"/>
		<HeaderElement name="Perfil" subdirectory="/profile"/>
		
		{#if !$page.data.username}
			<HeaderElement name="Login" subdirectory="/login"/>
		{:else}
		<!--Al no estar en la ruta de login el action tiene que indicar la ruta y la acción-->

			<form method="POST" action="/login?/logout&redirectTo={$page.url.pathname}">
				<button type="submit">Logout</button>
			</form>
		{/if}

		<Cart />	
</ul>
</div>
 
<style lang="scss">
.clearfix::after {
		content: "";
		clear: both;
		display: block;
	}
	.topbar {
				box-sizing: border-box;
		border-bottom: 6px solid var(--text-color);
		background-color: var(--topbar-background-color);


		/*Necesitamos usarlo ya que si no las imagenes del slideshow apareceria por encima*/
		z-index: 100;

		&__list {
			list-style: none;
			margin: 0;
			padding: 0;
			width: 100%;	
		}
		position: sticky;
		top: 0;
		z-index: 100;

		&__logo {
			width: 45px;
			height: auto;
			
			@media (max-width: 650px) {
				top: 40%;
				position: relative;
				left: 35%;
			}
		}
&__element--container {
			float: left;
		}

		& li {
			padding: 1rem 2rem 0.5rem;
			font-size: 2.5rem;
			color: var(--text-color);
			transition: all 0.3s;
		}
	}
</style>
