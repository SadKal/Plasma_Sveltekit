<script>
	let imgDefault = 'default.jpg';

	export let username;
	//Funcion con la cual la imagen que me pasa la pongo como la Default para enseñarla
	function ChangeImage(newImg) {
		imgDefault = newImg;
	}

	function HandleImg(e) {
		/* Creo una funcion para manejar el evento que causa que seleccione una imagen */
		const file = e.target.files[0]; //Meto el archivo seleccionado (imagen)

		if (file) {
			/* Si esa variable tiene una foto nueva hace esto: */
			const reader = new FileReader(); //Creo un objeto el cual puede leer archivos del lado del cliente

			//Configuro un evento que se va a ejecutar cuando la lectura del archivo este completa
			reader.onload = function (e) {
				//El evento contiene datos de la carga de la imagen (load)

				ChangeImage(e.target.result); //Llamo a la otra funcion la cual me va a cambiar la imagen
			};

			reader.readAsDataURL(file); //Leer un archivo como una URL de datos en base64
		} else {
			ChangeImage('default.jpg'); // En el caso de que no se cambie la imagen me dejas la de por defecto
		}
	}

	//Cuando me hacen click en la imagen llama a esta imagen
	function handleClickOnImage() {
		// Simular clic en el input de tipo "file" oculto
		//Por asi decirlo le estoy diciendo que se cree esa accion cuando pulsan la imagen no solo el input, entonces una vez hace eso llama a lo demas.
		document.getElementById('img-uploader').click();
	}
</script>

<main>
	<div class="profile">
		<div class="profile__photo">
			<img src={imgDefault} alt="" class="image-rounded" on:click={handleClickOnImage} />
			<input type="file" id="img-uploader" on:change={HandleImg} />
			<p class="profile__username">Bienvenido, {username}</p>
		</div>

		<div class="profile__info">
			<div class="profile__info__username">
				<form action="/profile/changeUsername" method="post">
					<button type="submit">Cambiar nombre de usuario</button>
				</form>
			</div>
			<div class="profile__info__email">
				<form action="/profile/changeEmail" method="post">
					<button type="submit">Cambiar email</button>
				</form>
			</div>
			<div class="profile__info__changepass">
				<form action="/password" method="post">
					<button type="submit">Cambiar contraseña</button>
				</form>
			</div>
		</div>
	</div>
</main>

<style lang="scss">
	.profile {
		width: 100%;
		height: 70vh;
		display: grid;
		grid-template-rows: 30% 70%;
		margin-bottom: 20px;

		&__username {
			font-size: 1.5rem;
			font-weight: 600;
			color: var(--text-color);
		}

		&__photo {
			width: 100%;
			display: flex;
			padding: 20px;
			justify-content: center;
			align-items: center;
			gap: 40px;

			.image-rounded {
				border-radius: 50%;
				width: 125px;
				height: 125px;
				transition: all 0.5s; /* Le doy una transicion para la imagen */
			}
		}

		&__info {
			width: 80%;
			height: 100%;
			display: flex;
			margin: 30px auto;
			gap: 20px;
			padding: 20px;
			font-size: 25px;
			justify-content: space-evenly;
			&__username,
			&__email,
			&__changepass {
				button[type='submit'] {
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

		#img-uploader {
			//Le quito el input para que no se vea
			position: absolute;
			top: 0;
			left: 0;
			width: 0%;
			height: 0%;
			opacity: 0;
			cursor: pointer;
			display: none;
		}
	}
</style>
