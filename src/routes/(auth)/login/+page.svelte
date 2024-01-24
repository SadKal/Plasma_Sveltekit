<script>

import { page } from '$app/stores'; //Lo cojo para coger la ruta en la que estoy.

	import { enhance } from '$app/forms'; //Y esto es para manejar los formularios

    export let form; //Se crea una variable que se puede pasar desde su padre

    $: console.log('form', form);//Muestro la info de lo que tiene form

	const redirectTo = $page.url.searchParams.get('redirectTo') || '/';//Aqui lo que hago es coger la URL actual y lo almaceno en la variable, sino lo encuentra me coge /

	let iconSrc = "/plasma_icon_notext.png";//Imagen del icono

</script>

{#if form?.succes}<!-- Pongo ? para que en el caso de que sea nulo me lo ponga undefined y si succes tiene valor me lo devuelve -->
    <p style="color: green;">Estas logeado!!</p>
{/if}

<div class="login">
    <div class="login__navigation">
        
        <div class="login__navigation__icon">
            <img src={iconSrc} alt="logo" class="logo" />
        </div>

        <div class="login__navigation__cross">
            <a href="" class="cruz"></a>
        </div>
    </div>

    <div class="login__form">

        <span>Inicia sesión</span>
        <div class="login__form__links">
            <button class="login__form__links__facebook">
                <i class="fab fa-facebook-f fa-2x"></i>                      
            </button>

            <button class="login__form__links__google">
                <div class="google"></div>
            </button>

            <button class="login__form__links__apple">
                <i class="fab fa-apple fa-2x"></i>
            </button>

            <button class="login__form__links__discord">
                <i class="fab fa-discord fa-2x"></i>
            </button>
        </div>

        <div class="login__form__separator">
        </div>

        <form method="POST" action={'?/login&redirectTo=' + redirectTo} use:enhance><!-- Una vez que se envie el formulario lo envio a la URL de donde estoy que es login y luego otra parte de la url que es para reedirigir que me manda a la pagina que quiero --> <!-- Y uso enhance para mejorar las capacidades del form como el manejo de eventos y validcion -->
            <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                value={form?.username || ''}
            /> <!-- Lo que hago aqui es que si en el formulario se ha dado un valor se va a quedar grabado pero sino se pondra '' -->
        
        {#if form?.usernameMissing}
            <p style="color:red;"> Usuario requerido</p>
        {/if}
        <br>
        <br>
        
        <input type="text" name="password" id="password" placeholder="Password" />
        
            <br />
        
        {#if form?.passwordMissing}<!-- Pongo ? para que en el caso de que sea nulo me lo ponga undefined y si passwwordMissing tiene valor me lo devuelve -->
            <p style="color: red;">Contraseña requerida</p>
        {/if}
        <br/>
        <button type="submit">Submit</button>

        


        </form>
    </div>

    <div class="login__image">
    </div>
</div>



<style lang="scss">
.login{
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-columns: 1fr 1fr;

    &__navigation{
        width: 100%;
        position: absolute;
        display: grid;
        grid-template-columns:1fr 1fr 1fr;

        &__icon{
            display: grid;
            place-items: start;
            margin: 20px;
            
            .logo {
			    width: 70px;
			    height: auto;

			@media (max-width: 650px) {
				top: 40%;
				position: relative;
				left: 35%;
			}
		}

        
        }
        
        &__cross{
            display: grid;
            grid-column-start: 3;
            place-items: end;
            width: 100%;
            height: 100%;
            
            
            .cruz {
                position: relative;
                width: 70px;
                height: 70px;
                background-color: var(--text-color);
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                text-decoration: none; 
                margin: 20px;


                &::before,
                 &::after {
                    content: '';
                    position: absolute;
                    background-color: white;
                    height: 2px;
                    width: 50%;
                }

                &::before {
                    transform: rotate(45deg);
                }

                &::after {
                    transform: rotate(-45deg);
                }
            }
        }
    }
    

    &__form{
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: auto;
        max-width: 550px;
        padding: 70px 40px 60px;
        width: 100%;

        span{
            font-size: 24px;
        }
        
        &__links{
            display: grid;
            grid-template-columns: 20% 20% 20% 20%;
            grid-template-rows: 1;
            justify-content: space-between;
            height: 50px;
            margin: 20px 0 0 0;

            button{
                border: none;
                border-radius: 5%;
            }

            &__facebook{
                background-color: #1877f2;
                color: white;
            }

            &__google{
                background-color: white;
                display: grid;
                
                .google{
                    background-image: url('google.png');
                    background-size: contain;  // Ajusta según tus necesidades
                    background-repeat: no-repeat;
                    width: 25px;  // Ajusta según tus necesidades
                    height: 25px;
                    margin: auto auto;
                }
            }

            &__apple{
                background-color: black;
                color: white;
            }

            &__discord{
                background-color: #5865f2;
                color: white;
            }
        }

        &__separator {
            width: 100%;
            margin: 40px 0; // Ajusta según tus necesidades
            position: relative;

        &::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          width: 100%;
          height: 1.5px;
          background-color: var(--text-color);
        }
      }

        form{
            width: 100%;
            height: 100%;
        }

        label{
            font-size: 2.5rem;
            color: var(--text-color);
        }

            input{
                width: 100%;
                padding: 15px;
                background: transparent;
                border: 2px solid var(--text-color);
                border-radius: 5px;
                font-size: 16px;
                box-sizing: border-box;
                color: beige;
                    }

        button[type="submit"]{
            width: 100%;
            padding: 15px;
            text-align: center;
            background-color: var(--text-color);
            border: none;
            border-radius: 5px;
            color: beige;
            font-size: 16px;
            font-weight: bold;
        }
        


    }

    &__image{
        height: 100vh;
        background-image: url('gta.jpg');
        background-size: cover;
        background-position:center ;    
    }
}

</style>
