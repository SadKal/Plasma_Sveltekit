<script>

    import { page } from '$app/stores'; //Lo cojo para coger la ruta en la que estoy.
    
        import { enhance } from '$app/forms'; //Y esto es para manejar los formularios
    
        export let form; //Se crea una variable que se puede pasar desde su padre
    
        $: console.log('form', form);//Muestro la info de lo que tiene form
        $:console.log('redirectTo', redirectTo);
    
        const redirectTo = $page.url.searchParams.get('redirectTo') || '/';//Aqui lo que hago es coger la URL actual y sus parametros y lo almaceno en la variable, sino lo encuentra me coge /
    
        let iconSrc = "/plasma_icon_notext.png";//Imagen del icono
    
    </script>

<div class="register">
    <div class="register__form">

<form method="POST" >
    <input
        type="text"
        name="email"
        id="email"
        placeholder="Email"
        value={form?.email || ''}
    /> <!-- Lo que hago aqui es que si en el formulario se ha dado un valor se va a quedar grabado pero sino se pondra '' -->

{#if form?.emailMissing}
    <p style="color:red;"> Usuario requerido</p>
{/if}
   

<input type="text" name="password" id="password" placeholder="Password" />
<br />

{#if form?.passwordMissing}<!-- Pongo ? para que en el caso de que sea nulo me lo ponga undefined y si passwwordMissing tiene valor me lo devuelve -->
    <p style="color: red;">Contraseña requerida</p>
{/if}

<input
        type="text"
        name="nombre"
        id="nombre"
        placeholder="Nombre"
        value={form?.nombre || ''}
    />

    <input
    type="text"
    name="apellido"
    id="apellido"
    placeholder="Apellido"
    value={form?.apellido || ''}
/>

<input
    type="text"
    name="user"
    id="user"
    placeholder="User"
    value={form?.apellido || ''}
/>

<button type="submit">Accept</button>
</form>
</div>
</div>

<style lang="scss">

    .register{
        height: 100vh;
        width: 100vw;
        display: grid;
        
        &__form{
            display: grid;

            form{
                place-self: center;
            display: grid;
            grid-template-columns: 50% 50%;
            grid-template-rows: 1fr 1fr;
            gap: 15px;
            width: 50vw;
            height: 18vh;

            input{
                width: 100%;
                height: 100%;
                padding: 15px;
                
                background: transparent;
                border: 2px solid var(--text-color);
                border-radius: 5px;
                font-size: 16px;
                box-sizing: border-box;
                color: beige;
                    
            }

            #email {
                grid-column: 1;
            }

            #password {
                grid-column: 2;
            }

            #nombre {
                grid-column: 1;
                grid-row: 2;
            }

            #apellido {
                grid-column: 2;
                grid-row: 2;
            }
        }
        }
    }

</style>
