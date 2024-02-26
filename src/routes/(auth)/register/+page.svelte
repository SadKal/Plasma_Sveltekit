<script>

    import { page } from '$app/stores'; //Lo cojo para coger la ruta en la que estoy.
    
        import { enhance } from '$app/forms'; //Y esto es para manejar los formularios
    
        export let form; //Se crea una variable que se puede pasar desde su padre
        
    
        let iconSrc = "/plasma_icon_notext.png";//Imagen del iconoç
    
    </script>

<div class="register">

    <div class="register__navigation">
        <div class="register__navigation__icon">
            <img src={iconSrc} alt="logo" class="logo" />
        </div>

        <div class="register__navigation__cross">
            <a href="/" class="cruz"></a>
        </div>
    </div>

    <div class="register__form">

<form method="POST">

    <span>Registrarse</span>
    <input
        type="text"
        name="email"
        id="email"
        placeholder="Email"
        value={form?.email || ''}
    /> <!-- Lo que hago aqui es que si en el formulario se ha dado un valor se va a quedar grabado pero sino se pondra '' -->

{#if form?.emailMissing}
    <p style="color:red;"> Email requerido</p>
{/if}
   

<input type="text" name="password" id="password" placeholder="Password" />


{#if form?.passwordMissing}<!-- Pongo ? para que en el caso de que sea nulo me lo ponga undefined y si passwwordMissing tiene valor me lo devuelve -->
    <p style="color: red;">Contraseña requerida</p>
{/if}

<input
    type="text"
    name="user"
    id="user"
    placeholder="User"
    value={form?.user || ''}
/>

{#if form?.userMissing}<!-- Pongo ? para que en el caso de que sea nulo me lo ponga undefined y si passwwordMissing tiene valor me lo devuelve -->
    <p style="color: red;">Usuario requerida</p>
{/if}
<button type="submit">Accept</button>

<div class="register__forgot">
    <a href="/login">¿Iniciar sesión?</a>
</div>


</form>
</div>
</div>

<style lang="scss">

    .register{
        height: 100vh;
        width: 100vw;
        display: grid;

        &__navigation{
        width: 100%;
        position: absolute;
        display: grid;
        grid-template-columns:1fr 1fr 1fr;

        &__icon{
            display: grid;
            place-items: start;

            @media screen and (max-width: 900px) {
                grid-column: 2;
                place-items: center;        
            }
            
            .logo {
                margin: 20px;
			    width: 70px;
			    height: 78px;
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
            display: grid;

            form{
                place-self: center;
            display: grid;
            grid-template-columns: 100%;
            grid-template-rows: 1fr 1fr 1fr;
            width: 40vw;
            height: 25vh;
            
                span{
            font-size: 24px;
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
                margin-top:20px ;
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
            margin-top:20px ;
        }

        }
        }

        &__forgot{
        align-items: center;
        margin-top: 10px;
        
        a{
            text-decoration: none;
            color: var(--text-color);
            margin: 10px 0 0 0;
        }
    }
    }

</style>
