<script>
	import Communications from './Communications.svelte';
	import Custom from './Custom.svelte';
	import Email from './Email.svelte';
	import Privacy from './Privacy.svelte';
	import Idiom from './Idiom.svelte';

	let imgDefault = 'default.jpg';

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

	let componenteMostrado = null;
	function mostrarComponente(componente) {
		componenteMostrado = componente;
	}
</script>

<main>
	<div class="profile">
		<div class="profile__photo">
			<img src={imgDefault} alt="" class="image-rounded" on:click={handleClickOnImage} />
			<input type="file" id="img-uploader" on:change={HandleImg} />

			Maripins Miembr@ desde: Nov 30, 2023
		</div>

		<div class="profile__info">
			<div class="profile__info__settings">
				<a on:click={() => mostrarComponente('Profile')}
					>Personaliza tu perfil
					<div class="profile__link-content">
						<div class="profile__lines">
							<span>Avatar, gamertag y enlaces a redes sociales</span>
							<div class="profile__arrow"></div>
						</div>
					</div>
				</a>

				<a on:click={() => mostrarComponente('Communications')}>
					<div class="profile__link-content">
						Comunicaciones
						<div class="profile__lines">
							<span>Administrar correos electrónicos o notificaciones</span>
							<div class="profile__arrow"></div>
						</div>
					</div>
				</a>

				<a on:click={() => mostrarComponente('Privacity')}>
					<div class="profile__link-content">
						Privacidad
						<div class="profile__lines">
							<span>Administra tu información pública o privada</span>
							<div class="profile__arrow"></div>
						</div>
					</div>
				</a>

				<a on:click={() => mostrarComponente('Idiom')}
					>Idioma y moneda
					<div class="profile__link-content">
						<div class="profile__lines">
							<span>Cambia el idioma o moneda que deseas utilizar</span>
							<div class="profile__arrow"></div>
						</div>
					</div>
				</a>

				<a on:click={() => mostrarComponente('Email')}
					>Email y contraseña
					<div class="profile__link-content">
						<div class="profile__lines">
							<span>Gestiona tu correo electrónico y contraseña</span>
							<div class="profile__arrow"></div>
						</div>
					</div>
				</a>
			</div>

			<div class="profile__info__content">
				{#if componenteMostrado === 'Profile'}
					<Custom />
				{:else if componenteMostrado === 'Communications'}
					<Communications />
				{:else if componenteMostrado === 'Privacity'}
					<Privacy />
				{:else if componenteMostrado === 'Idiom'}
					<Idiom />
				{:else if componenteMostrado === 'Email'}
					<Email />
				{:else}
					<Custom />
				{/if}
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
			display: grid;
			grid-template-columns: 30% 70%;

			&__settings {
				font-size: 23px;
				margin-left: 30px;
				display: grid;
				grid-template-rows: repeat(5, 1fr);
				grid-gap: 20px;

				a {
					text-decoration: none;
					color: aliceblue;
					cursor: pointer;
					display: block; /* Hace que el enlace ocupe todo el ancho del contenedor */
					padding: 10px; /* Ajusta según sea necesario */
					background-color: rgba(0, 0, 0, 0.2);
					border-radius: 5px;
					transition: all ease 0.4s;
				}

				a:hover {
					border: 1.5px solid var(--text-color);
				}
			}

			&__content {
				margin-left: 4vw;
				padding-left: 20px;
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

		&__lines {
			width: 100%;
			span {
				display: inline-block;
				width: 90%;
				vertical-align: middle;
				line-height: 25px;
				color: var(--text-color);
			}
		}
	}
</style>
