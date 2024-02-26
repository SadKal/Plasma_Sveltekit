<script>
	import HeaderElement from "./HeaderElement.svelte";
	import Cart from "$lib/components/cart/Cart.svelte";
	import { page } from '$app/stores'; //Lo cojo para coger la ruta en la que estoy y los datos asociados a esta ruta.
	import { goto, invalidateAll, preloadData } from '$app/navigation'; //Se usa para manejr la navegación y la precarga de los datos. INVALIDATEALL es para para invalidar y reforzar la recarga de los datos precargados en la pagina actual
	export let login = false;

	let iconSrc = "/plasma_icon_notext.png";
	let iconLogin = "/login/login.png";
	let iconLogout = "/login/logout.png";
</script>

<<<<<<< HEAD
<div class="topbar clearfix">
	<ul class="topbar__list">
		<li class="topbar__element--container">
		<img src={iconSrc} alt="logo" class="topbar__logo" />
	</li>
		<HeaderElement name="Inicio" />
		<HeaderElement name="Biblioteca" subdirectory="/library"/>
		<HeaderElement name="Perfil" subdirectory="/profile"/>
		
		{#if login===null}
		<li class="topbar__element--container">
			<a href="/login">
				<img src={iconLogin} alt="logo" class="topbar__logo" />
			</a>
		</li>

		  {:else}
		<!--Al no estar en la ruta de login el action tiene que indicar la ruta y la acción-->
		<li class="topbar__element--container">
			<form method="POST" action="/login?/logout&redirectTo={$page.url.pathname}">
				<button type="submit" class="custom">
					<img src={iconLogout} alt="" class="topbar__logo">
				</button>
			</form>
			<li/>
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
=======
<div class="topbar">
	<div class="topbar__element--container">
		<img src={iconSrc} alt="logo" class="topbar__logo" />
	</div>
	<div class="topbar__list">
		<HeaderElement name="Inicio" />
		<HeaderElement name="Biblioteca" subdirectory="/library"/>
		<HeaderElement name="Perfil"/>
	</div>
	<Cart />	
</div>
 
<style lang="scss">
	.topbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 6rem;

		box-sizing: border-box;
>>>>>>> refs/remotes/origin/main
		border-bottom: 6px solid var(--text-color);
		background-color: var(--topbar-background-color);

		/*Necesitamos usarlo ya que si no las imagenes del slideshow apareceria por encima*/
		z-index: 100;

		&__list {
<<<<<<< HEAD
			list-style: none;
			margin: 0;
			padding: 0;
			width: 100%;	
=======
			display: flex;	
>>>>>>> refs/remotes/origin/main
		}
		position: sticky;
		top: 0;
		z-index: 100;

		&__logo {
			width: 45px;
			height: auto;
<<<<<<< HEAD
			
=======
			margin-left: 3.3rem;

>>>>>>> refs/remotes/origin/main
			@media (max-width: 650px) {
				top: 40%;
				position: relative;
				left: 35%;
			}
		}
<<<<<<< HEAD
&__element--container {
			float: left;
		}

		& li {
			padding: 1rem 2rem 0.5rem;
			font-size: 2.5rem;
			color: var(--text-color);
			transition: all 0.3s;
		}
=======
>>>>>>> refs/remotes/origin/main
	}

	button{
		background: transparent;
		border: none;
		margin: 0;
	}
	
</style>
