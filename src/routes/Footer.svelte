
<main>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"> <!-- Es una biblioteca de iconos, los cuale uso para mostrar los iconos de las redes sociales -->


    <footer class="footer">
        <div class="container">
            <div class="row">
                <div class="footer-col">
                    <h4>company</h4>
                    <ul>
                        <li><a href="#">about us</a></li>
                        <li><a href="#">our services</a></li>
                        <li><a href="#">privacy policy</a></li>
                        <li><a href="#">affiliate program</a></li>
                    </ul>
                </div>

                <div class="footer-col">
                    <h4>get help</h4>
                    <ul>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">shipping</a></li>
                        <li><a href="#">returns</a></li>
                        <li><a href="#">payment options</a></li>
                    </ul>
                </div>

                    <div class="footer-col">
                        <h4>online shop</h4>
                        <ul>
                            <li><a href="#">watch</a></li>
                            <li><a href="#">bag</a></li>
                            <li><a href="#">videogame</a></li>
                        </ul>
                    </div>

                        <div class="footer-col">
                            <h4>follow us</h4>
                            <div class="social-links"><!-- Enlace para ver la biblioteca de iconos:https://fontawesome.com/icons-->
                                <a href="#"><i class="fab fa-facebook-f"></i></a>
                                <a href="#"><i class="fab fa-twitter"></i></a>
                                <a href="#"><i class="fab fa-instagram"></i></a>
                                <a href="#"><i class="fab fa-linkedin-in"></i></a>
                            </div>  
                        </div>
            </div>
        </div>
    </footer>


</main>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
body {
    line-height: 1.5;
    font-family: 'Montserrat';
    position: relative;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.container {
    max-width: 1170px;
    margin: auto;
}

.row::after {/* Uso after para añadir contenido adicional (un elemento falso) */
    content: "";/* Le dejo sin contenido para que actue como un contenedor para ajustar la disposicion */
    display: table;/* Le digo que el elemento falso actue como una tabla, para que actue como un contenedor*/
    clear: both;/* Y le quito elementos flotantes */
}

ul {
    list-style: none;
}

.footer {
    background-color: #24262b;
    padding: 70px 0;
    margin-top: 20px;
    position: relative;
    width: 100%;

    @media(max-width:1600px){
    clear: both;
    margin-top: 20px;
 }
}

.footer-col {
    width: 25%;
    padding: 0 15px;
    float: left;
}

.footer-col h4 {
    font-size: 18px;
    color: #ffffff;
    text-transform: capitalize;
    margin-bottom: 35px;
    font-weight: 500;
    position: relative;
}

.footer-col h4::before {/* Lineas de abajo de los titulos */
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
    background-color:#d13364;
    height: 2px;
    box-sizing: border-box;
    width: 50px;
}

.footer-col ul li{
    margin-bottom: 10px;
}

.footer-col ul li a{
    color: #d13364;
    font-size: 16px;
    text-decoration: none;
    font-weight: 300;
    text-transform: capitalize;
    display: block;
    transition: all 0.3s ease;/* Transicion suave cuando cambian , es decir para que cuando pase con el raton sea mas suave*/
}

.footer-col ul li a:hover{/* Cuando el puntero este encima */
    padding-left:8px ;
}



.footer-col .social-links a{
    display: inline-block;
    height: 40px;
    width: 40px;
    background-color: #d13364;
    margin-right: 10px;
    margin: 0 10px 10px 0;
    text-align: center;
    line-height: 40px;
    border-radius: 50%;
    transition: all 0.5s ease;
    color: antiquewhite;
}

.footer .social-links a:hover{
    color: #d13364; /* El color de el icono cuando pases por encima y cmabie a este */
    background-color: white;/* color de el circulo cuando pases por encima */
}

/* PARTE RESPONSIVA */
 @media(max-width:767px){
    .footer-col{
        width: 50%;
        margin-bottom: 30px;
    }
 }

 @media(max-width:574px){
    .footer-col{
        width: 100%;
       
    }
 }

</style>