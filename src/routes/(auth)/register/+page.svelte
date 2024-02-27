<script>
	export let form; //Se crea una variable que se puede pasar desde su padre
</script>

<div class="register">
	<div class="register__form">
		<form method="POST">
			<span>Registrarse</span>
            <input type="text" name="user" id="user" placeholder="Nombre de usuario" value={form?.user || ''} />

            {#if form?.userMissing}<!-- Pongo ? para que en el caso de que sea nulo me lo ponga undefined y si passwwordMissing tiene valor me lo devuelve -->
                <p style="color: red;">Usuario requerido</p>
            {/if}

			<input type="text" name="password" id="password" placeholder="Contraseña" />

			{#if form?.passwordMissing}<!-- Pongo ? para que en el caso de que sea nulo me lo ponga undefined y si passwwordMissing tiene valor me lo devuelve -->
				<p style="color: red;">Contraseña requerida</p>
			{/if}

            <input type="text" name="email" id="email" placeholder="Email" value={form?.email || ''} />
			<!-- Lo que hago aqui es que si en el formulario se ha dado un valor se va a quedar grabado pero sino se pondra '' -->

			{#if form?.emailMissing}
				<p style="color:red;">Email requerido</p>
			{/if}

			<button type="submit">Registrarse</button>

			<div class="register__forgot">
				<a href="/login">¿Iniciar sesión?</a>
			</div>
		</form>
	</div>
</div>

<style lang="scss">
	.register {
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
				width: 40vw;
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

		&__forgot {
			align-items: center;
			margin-top: 10px;

			a {
				text-decoration: none;
				color: var(--text-color);
				margin: 10px 0 0 0;
			}
		}
	}
</style>
