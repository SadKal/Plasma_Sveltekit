<script>
    let imgDefault = 'src/assets/prof/default.jpg';
    
    //Funcion con la cual la imagen que me pasa la pongo como la Default para enseñarla
    function ChangeImage(newImg){
        imgDefault = newImg;
        imageStore.set(newImg);//Actualizo el valor del store.
    }
  
    function HandleImg(e){/* Creo una funcion para manejar el evento que causa que seleccione una imagen */
      console.log(e);
        const file=e.target.files[0]; //Meto el archivo seleccionado (imagen)
        console.log(file);
  
        if(file){/* Si esa variable tiene una foto nueva hace esto: */
            const reader = new FileReader(); //Creo un objeto el cual puede leer archivos del lado del cliente 
  
            //Configuro un evento que se va a ejecutar cuando la lectura del archivo este completa
            reader.onload = function (e){//El evento contiene datos de la carga de la imagen (load)
  
              console.log(e);    
              console.log(e.target.result);//Imprimo la URL de la imagen por consola
                ChangeImage(e.target.result); //Llamo a la otra funcion la cual me va a cambiar la imagen
            }
  
            reader.readAsDataURL(file);//Leer un archivo como una URL de datos en base64
        }else{
            ChangeImage('src/assets/prof/default.jpg');// En el caso de que no se cambie la imagen me dejas la de por defecto 
        }
  
    }
  
  //Cuando me hacen click en la imagen llama a esta imagen
    function handleClickOnImage() {
        // Simular clic en el input de tipo "file" oculto
        //Por asi decirlo le estoy diciendo que se cree esa accion cuando pulsan la imagen no solo el input, entonces una vez hace eso llama a lo demas.
        document.getElementById('img-uploader').click();
    }
  
      let componenteMostrado = null;
      function mostrarComponente(componente){
          componenteMostrado=componente;
      }
  </script>
  
  
  <main>
      <div class="profile">
              <div class="profile__photo">
                  <div class="profile__img">
                      <img src="{imgDefault}" alt="" class="image-rounded" on:click={handleClickOnImage}>
                      <input type="file" id="img-uploader" on:change={HandleImg}>
                  </div>
  
                  <div class="profile__data">
                      <div class="profile__name">
                          <span>Maripins</span>
                          <span>Miembr@ desde: Nov 30, 2023</span>
                      </div>
                  </div>
              </div>
  
              <div class="profile__user">
                  <div class="profile__settings">
                  <ul>
                      <li>
                          <a href="/profile#custom">Personaliza tu perfil
                              <div class="profile__link-content">  
                                  <div class="profile__lines">
                                      <span>Avatar, gamertag y enlaces a redes sociales</span>
                                      <div class="profile__arrow"></div>
                                  </div>
                              </div> 
                          </a>
                      </li>
                      <li><a href="/profile/communications" >
                              <div class="profile__link-content"> 
                                  Comunicaciones
                                  <div class="profile__lines">
                                      <span>Administrar correos electrónicos o notificaciones</span>
                                      <div class="profile__arrow"></div>
                                  </div>
                              </div>
                          </a>
                      </li>
  
                      <li><a href="/profile/privacy" >
                              <div class="profile__link-content"> 
                                  Privacidad
                                  <div class="profile__lines">
                                      <span>Administra tu información pública o privada</span>
                                      <div class="profile__arrow"></div>
                                  </div>
                              </div>
                          </a>
                      </li>
                      <li><a href="/profile/idiom" >Idioma y moneda
                              <div class="profile__link-content"> 
                                  <div class="profile__lines">
                                      <span>Cambia el idioma o moneda que deseas utilizar</span>
                                      <div class="profile__arrow"></div>
                                  </div>
                              </div>
                          </a>
                      </li>
                      <li><a href="/profile/email">Email y contraseña
                              <div class="profile__link-content"> 
                                  <div class="profile__lines">
                                      <span>Gestiona tu correo electrónico y contraseña</span>
                                      <div class="profile__arrow"></div>
                                  </div>
                              </div>
                          </a>
                      </li>
                  </ul>
              
  
                  <div class="profile__content">
                      <!-- {#if componenteMostrado === 'Profile'}
                          <Custom/>
                      {:else if componenteMostrado === 'Communications' }
                          <Communications/>
                      {:else if componenteMostrado === 'Privacity'}
                          <Privacy/>
                      {:else if componenteMostrado === 'Idiom'}
                          <Idiom/>
                      {:else if componenteMostrado === 'Email'}
                      <Email/>
                      {:else}
                          <Custom/>
                      {/if} -->
                  </div>
              </div>
      </div>
  
  </main>
  
  <style lang="scss">
      
      
      .profile{
          width: 100%;
          min-height: 115vh;
          font-family: 'Chakra Petch', sans-serif;
          color: var(--text-color);
  
          &__photo{
              border-bottom: 2px solid var(--text-color);
              margin-bottom:5vh;
              margin-right: 5vh;
              margin-left: 5vh;
          }
  
          &__img{
              text-align: center;
              line-height: 150px;
              height: 22vh;
             
          .image-rounded{
              border-radius: 50%;
              width: 150px; 
              height: 150px;
              transition: all 0.5s;/* Le doy una transicion para la imagen */
              margin-top: 40px;
              }
          }
  
  
          &__data{
              text-align: center;
              font-size: 20px;
          }
          &__name{
              margin-bottom: 15px;
              span{
                  display: block;
              }
          }
          &__lines{
              width: 100%;
              span{
                  display: inline-block;
                  width: 90%;
                  vertical-align: middle;
                  line-height: 25px;
                  color: var(--text-color);
              }
              
          }
  
          &__user{
              width: 100%;
          }
  
      
          &__content{
              width: 100%;
          }
  
          &__settings{
              font-size: 20px;
              width: 30%;
              ul li a {
                      text-decoration: none;
                      color: aliceblue;
                      cursor: pointer;
                      display: block; /* Hace que el enlace ocupe todo el ancho del contenedor */
                      padding: 10px; /* Ajusta según sea necesario */
                      background-color: rgba(0,0,0,0.2);
                      border-radius: 5px;
                  }
  
                  ul{
                      list-style-type:none;
                      border-right: 1.5px solid var(--text-color);
                  }
  
                  li{
                      display: block;
                      height: 11vh;
                      margin: 30px;	
                      
                       a{
                          text-decoration: none;
                          color: aliceblue;
                          cursor: pointer;
                          transition: all ease 0.4s;
                      }
                  }
  
                  a:hover{
                      border: 1.5px solid var(--text-color);
                  }
          }
  
          &__content{
              margin-left: 6%;
          }
  
      //         &__user{
      //             height: 100%;
      // 			position: relative;
      // 			font-size: 20px;
      //         }
  
      //         &__settings{
      //             width: 30%;
      //             height: 100%;
      //             border-right: 2px solid var(--text-color);
      //             display: flex;
      //             float: left;
      // 			font-size: 25px;
  
      //             @media  (max-width: 1600px)  {
      // 		        width: 100%;
      //                 display: block;
      // 		        border-right: none;
      // 	        }
  
  
  
      // 			ul li a {
      // 			    text-decoration: none;
      // 			    color: aliceblue;
      // 			    cursor: pointer;
      // 			    display: block; /* Hace que el enlace ocupe todo el ancho del contenedor */
      // 			    padding: 10px; /* Ajusta según sea necesario */
      // 				background-color: rgba(0,0,0,0.2);
      // 				border-radius: 5px;
      // 			}
  
      //             ul{
      //                 list-style-type:none;
      //             }
  
      //             li{
      //                 display: block;
      //                 height: 11vh;
      // 				margin: 30px;	
                      
       // 				a{
      //                     text-decoration: none;
      //                     color: aliceblue;
      //                     cursor: pointer;
      // 					transition: all ease 0.4s;
      //                 }
      //             }
  
      // 			a:hover{
      // 				border: 1.5px solid var(--text-color);
      // 			}
  
                  
      //         }
  
      //         &__content{
      //             width: 60%;
      //             float: left;
      // 			margin-left: 100px;
      //             min-height: 100vh;
  
      //             /* @media  (max-width: 1600px)  {
      // 		        width: 70%;
      //                 display: block;
      // 		        border-right: none;
      // 	        } */
                  
      //         }
  
             
      // }
  
      #img-uploader{//Le quito el input para que no se vea 
          position: absolute;
          top: 0;
          left: 0;
          width: 0%; 
          height: 0%; 
          opacity: 0; 
          cursor: pointer;
      }
  
  }
  </style>