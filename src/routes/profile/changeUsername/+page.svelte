<script>
	export let form; //Se crea una variable que se puede pasar desde su padre
</script>

<div class="changeUsername">
	<div class="changeUsername__form">
		<form method="POST">
			<span>Cambiar el nombre de usuario</span>
			<input
				type="text"
				name="oldusername"
				id="oldusername"
				placeholder="Nombre de usuario antiguo"
				value={form?.user || ''}
			/>

			{#if form?.userMissing}<!-- Pongo ? para que en el caso de que sea nulo me lo ponga undefined y si passwwordMissing tiene valor me lo devuelve -->
				<p style="color: red;">Debes de rellenar este campo</p>
			{/if}

			<input type="text" name="newusername" id="newusername" placeholder="Nombre de usuario nuevo" required/>

			<input type="text" name="password" id="password" placeholder="Contraseña" />

			{#if form?.passwordMissing}<!-- Pongo ? para que en el caso de que sea nulo me lo ponga undefined y si passwwordMissing tiene valor me lo devuelve -->
				<p style="color: red;">Debes de rellenar este campo</p>
			{/if}

			<button type="submit">Cambiar nombre de usuario</button>
		</form>
	</div>
</div>

<style lang="scss">
    .changeUsername {
		height: 80vh;
		width: 100%;
		display: grid;
		&__form {
			display: grid;

			form {
				place-self: center;
				display: grid;
				width: 400px;
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

	
</style>
