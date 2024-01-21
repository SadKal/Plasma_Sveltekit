<script>
	import HeaderElement from "./HeaderElement.svelte";
	import Cart from "$lib/components/cart/Cart.svelte";

	let iconSrc = "/plasma_icon_notext.png";
</script>

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
		border-bottom: 6px solid var(--text-color);
		background-color: var(--topbar-background-color);

		/*Necesitamos usarlo ya que si no las imagenes del slideshow apareceria por encima*/
		z-index: 100;

		&__list {
			display: flex;	
		}
		position: sticky;
		top: 0;
		z-index: 100;

		&__logo {
			width: 45px;
			height: auto;
			margin-left: 3.3rem;

			@media (max-width: 650px) {
				top: 40%;
				position: relative;
				left: 35%;
			}
		}
	}
</style>
