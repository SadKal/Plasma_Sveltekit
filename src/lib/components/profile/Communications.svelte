<script>

</script>

<main>
    <div class="communications">
            <div class="communications__adjustment">
                <div class="communications__title">
                    <h1>Ajuste de comunicaciones</h1>
                </div>
                <div class="communications__email">
                    <p>marioaajsjaj@gmail.com</p>
                </div>
            </div>
    
            <div class="communications__news">
                <div class="communications__title">
                    <h1>Sigue nuestras noticias</h1>
                </div>
                
                <div class="communications__checkboxs">

                    <div class="checkboxs__container">
                        <div class="checkbox-slider">
                            <input type="checkbox" id="my-slider-1">
                            <label for="my-slider-1">Recibe noticias de IG</label>
                        </div>

                        <div class="checkbox-slider">
                            <input type="checkbox" id="my-slider-2">
                            <label for="my-slider-2">Recibe las ofertas de la semana por email</label>
                        </div>

                        <div class="checkbox-slider">
                            <input type="checkbox" id="my-slider-3">
                            <label for="my-slider-3">Recordatorio de cesta pendiente</label>
                        </div>
                    </div>

                
                </div>
            </div>

            <div class="communications__wishlist">
                <div class="communications__title">
                    <h1>Wishlist-Settings wishlist</h1>
                </div>
                
                <div class="communications__checkboxs">
                    <div class="checkboxs__container">
                        <div class="checkbox-slider">
                            <input type="checkbox" id="wishlist-slider-1">
                            <label for="wishlist-slider-1">Apertura de reservas</label>
                        </div>

                        <div class="checkbox-slider">
                            <input type="checkbox" id="wishlist-slider-2">
                            <label for="wishlist-slider-2">Entrega de las primeras llaves</label>
                        </div>

                        </div>
                    </div>
                </div>
            </div>
        
</main>

<style lang="scss">

        .communications{
            width: 100%;
            height: 100%;
            color: var(--text-color);
            display: inline-block;

            &__email{
                p{
                    font-size: 18px;
                    color: rgba(beige,0.8);
                }
            }

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