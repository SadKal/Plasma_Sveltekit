<script>
    import Custom from "./Custom.svelte";
    import {writable} from 'svelte/store';

    //Creamos un store para la imagen
    export const selectedImage = writable(null);
  
      let imgDefault = 'src/assets/prof/default.jpg';
  
      function ChangeImage(newImg){
          imgDefault = newImg;
      }
  
      function HandleImg(e){/* Creo una funcion para manejar el evento que causa que seleccione una imagen */
          const file=e.target.files[0]; /* Meto lo que me pasen en una variable */  
          if(file){/* Si esa variable tiene una foto nueva hace esto: */
              const reader = new FileReader();/* Un objeto el cual puede leer del lado del cliente */
              reader.onload = function (e){     /* reader tiene un evento que lo manejo con una funcion, que se ejecute cuando finaliza la lectura */

                //Actualizamos el store con la URL de la imagen
                selectedImage.set(e.target.result);

                  ChangeImage(e.target.result); /* Llamo a la otra funcion para que me cambie la imagen */
              }
              reader.readAsDataURL(file);/* Que me lea la imagen como una URL */
          }else{
            selectedImage.set(null);
              ChangeImage('/default.jpg');/* En el caso de que no se cambie la imagen me dejas la de por defecto */
          }
  
      }


      function handleClickOnImage() {
          // Simular clic en el input de tipo "file"
          document.getElementById('img-uploader2').click();
      }
  </script>

<main>
<div class="all">
    <div class="custom">
            <div class="custom__image">
                <div class="custom__title">
                    <h1>Imagen de perfil</h1>
                </div>
                <div class="custom__imgUser">
                    <img src="{imgDefault}" alt="" class="image-rounded" on:click={handleClickOnImage}>
                    <input type="file" id="img-uploader2" on:change={HandleImg}>
                    <div class="custom__camera">
                            <div class="custom__cameraText">.jpg/png</div>
                    </div>
                </div>
            </div>

            <div class="custom__nameUser">
                <div class="custom__title">
                    <h1>Nombre de usuario</h1>
                </div>

                <div class="custom__nameInput">
                    <input type="text" name="" id="">
                    <input type="submit" value="Aceptar">
                </div>
            </div>
    </div> 
    <div class="cus">
     <h1>Enlaces de redes</h1>   
        <div class="cus__uno">
            <div class="cus__network1">
                <label for="">Twitch</label><br>
                <input type="text" name="" id="">
            </div>
            <div class="cus__network2">
                <label for="">Steam</label><br>
                <input type="text" name="" id="">
            </div>
            <div class="cus__network3">
                <label for="">Ubisoft Connect</label><br>
                <input type="text" name="" id="">
            </div>
        </div>
        <div class="cus__dos">
            <div class="cus__network4">
                <label for="">Youtube</label><br>
                <input type="text" name="" id="">
            </div>
        
            <div class="cus__network5">
                <label for="">Discord</label><br>
                <input type="text" name="" id="">
            </div>
            <div class="cus__network6">
                <label for="">EA</label><br>
                <input type="text" name="" id="">
            </div>
        </div>
        <div class="cus__submit">
            <input type="submit" value="Aceptar">
        </div>
    </div>
</div>
    </main>

<style lang="scss">
    
    .all{
        float: left;

        @media (max-width:768px) {
                display: block;
        }
    }
    .custom{
        width: 100%;
        height: 100%;
        color: var(--text-color);
        display: inline-block;

        h1{
            margin-bottom: 30px;
        }
      
        
            input[type="text"]{
                        width: 75%;
                        padding: 15px;
                        background: transparent;
                        border: 2px solid var(--text-color);
                        border-radius: 5px;
                        font-size: 16px;
                        box-sizing: border-box;
                        
        }

        input[type="submit"]{
            margin-left: 10px;
            height: 40px;
            width: 70px;
            background:var(--text-color);
            color: beige;
            border: none;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0,0,0,.1);
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            transition: all 0.5s ease;
            }

        &__image{
            float: left;
            width: 40%;
            @media (max-width: 768px) {
            width: 100%; 
            }
        }

        &__camera{
            display: inline-block;
            font-size: 15px;
            margin-left: 20px;
                img{
                    width: 30px;
                    height: 30px;
                    filter: invert(100%);//La pongo en blanco
                }

        }

        &__cameraText{
            display: inline-block;
            margin-left:5px ;
            text-align: center;
        }

       

        &__imgUser{
 
        .image-rounded{
            border-radius: 50%;
            width: 80px; 
            height: 80px;
            transition: all 0.5s;/* Le doy una transicion para la imagen */
            }
        }

        &__nameUser{
            width: 40%;
            float: left;    
            margin-left: 6vw;

            @media (max-width: 768px) {
            width: 100%; 
            margin-left: 0;
            }
        }

        &__nameInput{
            margin-top: 4vh;
        }
        
    }

    .cus{
        width: 100%;
        height: 100%;
        color: var(--text-color);
        display: inline-block;
        margin-top: 30px;

        

        label{
            margin-bottom: 15px;
        }

        input[type="text"]{
            width: 60%;
            padding: 15px;
            background: transparent;
            border: 2px solid var(--text-color);
            border-radius: 5px;
            font-size: 16px;
            box-sizing: border-box;
            margin-bottom: 20px;
        }

        &__uno,&__dos{
            width: 50%;
            float: left;
        }

        &__submit{
            clear: both;
            height: 20px;
            width: 100%;
            input[type="submit"]{
                margin-left: 33%;
                margin-right: 60%;
                margin-top: 5px;
                margin-bottom: 20px;
                height: 40px;
                width: 80px;
                background:var(--text-color);
                color: beige;
                border: none;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0,0,0,.1);
                cursor: pointer;
                font-size: 16px;
                font-weight: 600;
                transition: all 0.5s ease;
            }
        }
        
    }

    #img-uploader2{//Le quito el input para que no se vea 
        position: absolute;
        top: 0;
        left: 0;
        width: 0%; 
        height: 0%; 
        opacity: 0; 
        cursor: pointer;
    }
</style>