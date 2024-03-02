<script>
export let data;	
	/* let imgDefault = 'default.jpg'; */
	let username= data.username;
  
	export let email = data.email;
	console.log('Usuario prof:' + username);
    	console.log('Usuario email:' + email);

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
    import { page } from '$app/stores'; //Lo cojo para coger la ruta en la que estoy.
	

</script>

<main>
	<div class="profile">
		<div class="profile__photo">
<!-- 			<img src={imgDefault} alt="" class="image-rounded" on:click={handleClickOnImage} />
 -->			<input type="file" id="img-uploader" on:change={HandleImg} />
		</div>

			<div class="profile__info">
				<div class="profile__info__nameuser">
					<form  method="post" action='?/updateUsername'>
                    	<h1>Nombre de usuario:</h1>
						<input type="text" name="username" placeholder={username}>
                        <button type="submit">Guardar</button>
					</form>
                </div>

				<div class="profile__info__email">
					<form method="post" action='?/updateEmail'>
						<h1>Email de la cuenta:</h1>
						<input type="email" name="email" id="" placeholder={email}>
                        <button type="submit">Guardar</button>
					</form>
				</div>

				<div class="profile__info__changepass">
					<form method="post">
						<h1>Cambiar la contraseña:</h1>
						<a href="/password">Cmabia</a>
					</form>
				</div>
			</div>
	</div>
</main>

<style lang="scss">
	.profile {
		width: 100vw;
		height: 110vh;
		display: grid;
		grid-template-rows: 25% 75%;
		margin-bottom: 20px;

		

		&__photo {
			width: 100%;
			display: grid;
			grid-template-rows: 1fr;
			place-items: center;
			color: var(--text-color);

			.image-rounded {
				border-radius: 50%;
				width: 150px;
				height: 150px;
				transition: all 0.5s; /* Le doy una transicion para la imagen */
				margin-top: 30px;
			}
		}

		&__info {
			width: 100%;
			height: 100%;
			color: var(--text-color);
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 20px;
			padding: 20px;
			font-size: 25px;
			&__nameuser,&__email{
				
				input {
					width: 70%;
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
					width: 28%;
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
