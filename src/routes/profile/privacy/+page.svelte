<script>

</script>

<main>
    <div class="privacy">
        <div class="privacy__news">
            <div class="privacy__title">
                <h1>Privacidad</h1>
            </div>
            
            <div class="privacy__checkboxs">
                <div class="checkboxs__container">
                    <div class="checkbox-slider">
                        <input type="checkbox" id="my-slider-1">
                        <label for="my-slider-1">Mostrar mis amigos en mi perfil público</label>
                    </div>
                    <div class="checkbox-slider">
                        <input type="checkbox" id="my-slider-2">
                        <label for="my-slider-2">Mostrar mis juegos en mi perfil público</label>
                    </div>
                    <div class="checkbox-slider">
                        <input type="checkbox" id="my-slider-3">
                        <label for="my-slider-3">Permitir que otros miembros me envíen solicitudes de amistad</label>
                    </div>
                    <div class="checkbox-slider">
                        <input type="checkbox" id="my-slider-4">
                        <label for="my-slider-4">Mostrar mis reseñas en mi perfil público</label>
                    </div>
                    <div class="checkbox-slider">
                        <input type="checkbox" id="my-slider-5">
                        <label for="my-slider-5">Mostrar mi wishlist en mi perfil público</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
        
</main>

<style lang="scss">

    .privacy{
        width: 100%;
        height: 100%;
        color: var(--text-color);
        display: inline-block;

        &__adjustment, &__news{
            margin-bottom: 5vh;
        }
        
        &__checkboxs{
            background-color: rgba(0,0,0,0.2);
            width: 70%;
            border-radius: 20px;
            padding: 10px;
            color: beige;

            .checkbox-slider{
                margin-bottom: 20px;
            }

            .checkbox-slider input{/* Dejo de monstrar el input */
                display: none;
            }

            .checkbox-slider label{
                position: relative;
                margin-left: 50px;
            }

            .checkbox-slider label:after{/* Es como si le pusiese dentro un div y lo que estoy haceindo es la bolita */
                content: '';
                display: inline-block;
                width: 18px;
                height: 18px;
                position: absolute;
                top:4px;
                left: -45px;
                background-color: white;
                border-radius: 20px;
                transition: 0.4s all ease;
            }

            .checkbox-slider label:before{/* dibujando el fondo de la bolita */
                content: '';
                display: inline-block;
                width: 44px;
                height: 25px;
                position: absolute;
                left: -50px;
                background-color: #ccc;
                border-radius: 15px;
                transition: 0.4s all ease;

            }

            .checkbox-slider input:checked + label:after {/* Seleccionamos el input que este checkeado y afectamos al elemento que esta despues (+) el label */
                left:-30px;
            }

            .checkbox-slider input:checked + label::before {/* Seleccionamos el input que este checkeado y afectamos al elemento que esta despues (+) el label y cambio el color*/
                background-color: var(--text-color);
            }
        
            }
    }
</style>