<script>
	import { page } from '$app/stores'; //Lo cojo para coger la ruta en la que estoy.
	export let form; //Se crea una variable que se puede pasar desde su padre

	const redirectTo = $page.url.searchParams.get('redirectTo') || '/'; //Aqui lo que hago es coger la URL actual y sus parametros y lo almaceno en la variable, sino lo encuentra me coge /

</script>

<div class="password">
	<div class="password__form">
		<form method="POST">
			<span>Cambiar la contraseña</span>
			<input type="text" name="username" id="user" placeholder="Nombre de usuario" value={form?.user || ''} />

			{#if form?.userMissing}<!-- Pongo ? para que en el caso de que sea nulo me lo ponga undefined y si passwwordMissing tiene valor me lo devuelve -->
				<p style="color: red;">Usuario requerido</p>
			{/if}

			<input type="text" name="password" id="password" placeholder="Contraseña" />

			{#if form?.passwordMissing}<!-- Pongo ? para que en el caso de que sea nulo me lo ponga undefined y si passwwordMissing tiene valor me lo devuelve -->
				<p style="color: red;">Contraseña requerida</p>
			{/if}

			<button type="submit">Cambiar contraseña</button>
            
            <div class="login">
                <a href="/login">Iniciar sesión</a>
            </div>
		</form>
	</div>
</div>

<style lang="scss">
	.password {
		height: 80vh;
		width: 100%;
		display: grid;
		&__form {
			display: grid;
			form {
				place-self: center;
				display: grid;
				grid-template-columns: 100%;
				grid-template-rows: 1fr 1fr 1fr;
				width: 400px;
				height: 25vh;
				span {
					font-size: 24px;
					color: var(--text-color);
				}
				input {
					width: 100%;
					padding: 15px;
					background: transparent;
					border: 2px solid var(--text-color);
					border-radius: 5px;
					font-size: 16px;
					box-sizing: border-box;
					color: beige;
					margin-top: 20px;
				}
				button[type='submit'] {
					width: 100%;
					padding: 15px;
					text-align: center;
					background-color: var(--text-color);
					border: none;
					border-radius: 5px;
					color: beige;
					font-size: 16px;
					font-weight: bold;
					margin-top: 20px;
				}
			}
		}
	}

		.login {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 50px;

			a {
				text-decoration: none;
				color: var(--text-color);
			}
		}
</style>
