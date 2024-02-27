<script>
	import { page } from '$app/stores'; //Lo cojo para coger la ruta en la que estoy.
	import { enhance } from '$app/forms'; //Y esto es para manejar los formularios
	export let form; //Se crea una variable que se puede pasar desde su padre

	$: console.log('form', form); //Muestro la info de lo que tiene form
	$: console.log('redirectTo', redirectTo);

	const redirectTo = $page.url.searchParams.get('redirectTo') || '/'; //Aqui lo que hago es coger la URL actual y sus parametros y lo almaceno en la variable, sino lo encuentra me coge /
</script>

<div class="login">
	<div class="login__register">
		<div class="login__register__form">
			<span>Inicia sesión</span>
			<!----------------------------------------------------- FORMULARIO---------------------------------------- -->

			<form method="POST" action={'?/login&redirectTo=' + redirectTo} use:enhance>
				<!-- Una vez que se envie el formulario lo envio a la URL de donde estoy que es login y luego otra parte de la url que es para reedirigir que me manda a la pagina que quiero -->
				<!-- Y uso enhance para mejorar las capacidades del form como el manejo de eventos y validcion -->
				<input
					type="text"
					name="username"
					id="username"
					placeholder="Nombre de usuario"
					value={form?.username || ''}
				/>
				<!-- Lo que hago aqui es que si en el formulario se ha dado un valor se va a quedar grabado pero sino se pondra '' -->

				{#if form?.usernameMissing}
					<p style="color:red;">Usuario requerido</p>
				{/if}
				<input type="text" name="password" id="password" placeholder="Contraseña" />

				{#if form?.passwordMissing}<!-- Pongo ? para que en el caso de que sea nulo me lo ponga undefined y si passwwordMissing tiene valor me lo devuelve -->
					<p style="color: red;">Contraseña requerida</p>
				{/if}
				<button type="submit">Iniciar sesión</button>

				{#if form?.userNotFound}<!-- Pongo ? para que en el caso de que sea nulo me lo ponga undefined y si passwwordMissing tiene valor me lo devuelve -->
					<p style="color: red;">El usuario no esta registrado o la contraseña es incorrecta</p>
				{/if}
			</form>

			<div class="login__forgot">
				<a href="/register">¿Registrarse?</a>
				<a href="/password">¿Has olvidado la contraseña?</a>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.login {
		height: 80vh;
		width: 100%;
		display: grid;
		grid-template-rows: 1fr;
		@media screen and (max-width: 900px) {
			grid-template-columns: 1fr;
		}

		&__register {
			display: flex;
			height: 80vh;
			justify-content: center;
			&__form {
				top: 10%;
				position: relative;
				place-self: center;
				display: grid;
				grid-template-rows: 20px 1fr 1fr;
				grid-template-columns: 1fr;
				max-width: 400px;
				span {
					font-size: 24px;
					color: var(--text-color);
				}
				form {
					width: 100%;
					height: 100%;
					margin-top: 20px;
				}

				input {
					width: 100%;
					padding: 15px;
					margin: 5px 0;
					background: transparent;
					border: 2px solid var(--text-color);
					border-radius: 5px;
					font-size: 16px;
					box-sizing: border-box;
					color: beige;
				}

				button[type='submit'] {
					width: 100%;
					padding: 15px;
					margin-top: 5px;
					text-align: center;
					background-color: var(--text-color);
					border: none;
					border-radius: 5px;
					color: beige;
					font-size: 16px;
					font-weight: bold;
				}
			}
		}
		&__forgot {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 50px;

			a {
				text-decoration: none;
				color: var(--text-color);
			}
		}
	}
</style>
