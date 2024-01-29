<script>
    
</script>

<main>
<div class="email">
  <div class="email__uno">
          <div class="email__nameUser">
              <div class="email__title">
                  <h1>Seguridad de la cuenta</h1>
                  <p>mariirocoa@gmail.com</p>
              </div>
          </div>
  </div> 
  <div class="email_dos">
      
        
         <div class="email_dos__uno">
          <h1>Cambia tu email</h1> 
             <div class="email_dos__network1">
                 <input type="email" name="" id="" placeholder="Tu nuevo e-mail">
             </div>
             <div class="email_dos__network2">
                 <input type="password" name="" id="" placeholder="Confirma tu nuevo e-mail">
             </div>
             <div class="email_dos__network3">
                 <input type="password" name="" id="" placeholder="Tu contraseña actual">
             </div>
             
              <div class="email_dos__submit">
                  <input type="submit" value="Aceptar">
              </div>
         </div>
         <div class="email_dos__dos">
          <h1>Cambia tu contraseña</h1> 

             <div class="email_dos__network4">
                 <button >Desvincular mi cuenta de Google</button>
             </div>
         </div>
         
     </div>
</div>
  </main>

<style lang="scss">
  
  .email{
      float: left;
  }
  .email{
      width: 100%;
      height: 100%;
      color: var(--text-color);
      display: inline-block;        
  }

  .email_dos{
      width: 100%;
      height: 100%;
      color: var(--text-color);
      display: inline-block;
      margin-top: 30px;

      h1{
          margin: 0;
          font-size: 30px;
          margin-bottom: 10px;
      }

      input[type="email"],input[type="password"]{
          width: 80%;
          padding: 15px;
          background: rgba(0,0,0,0.2);
          border: 2px solid var(--text-color);
          border-radius: 5px;
          font-size: 16px;
          box-sizing: border-box;
          margin-bottom: 20px;
          margin-top: 15px;
          color: aliceblue;
      }

      &__uno{
          border-right: 1px solid var(--text-color);
          width: 40%;
          float: left;
          @media  (max-width: 1600px)  {
                  width: 100%;
                  display: block;
                  border-right: none;
              }
      }

      &__dos{
          width: 45%;
          float: left;
          margin-left: 6vw;

          @media  (max-width: 1600px)  {
              margin: 0;
                  width: 100%;
                  display: block;
                  border-right: none;
              }
      }

      input[type="submit"]{
              margin-left: 32%;
              margin-right: 60%;
              margin-top: 20px;
              margin-bottom: 20px;
              height: 40px;
              width: 70px;
              background:var(--text-color);
              color: beige;
              border: none;
              border-radius: 5px;
              box-shadow: 0 0 10px rgba(0,0,0,.1);
              cursor: pointer;
              font-size: 16px;
              transition: all ease 0.5s;

              &:hover{
                  background-color: beige;
                  color: var(--text-color);
              }
          }

          button{
              height: 65px;
              width: 25vw;
              font-size: 17px;
              background: var(--text-color);
              border: none;
              border-radius: 5px;
              color: beige;
              transition: all ease 0.5s;

              &:hover{
                  background-color: beige;
                  color: var(--text-color);
              }

              @media  (max-width: 1600px)  {
                  width: 70%;

              }
          }

      
  }
  
</style>
