<script>
    //import shopGameStore from '$stores/shopGame'

    export let game;
    let cover=game.cover;
    let name=game.name;
    let genres=game.genres;

    //Variables que guardan el angulo con el que rota la imagen y el elemento a rotar
    let rotationAngle = 0;
    let card;

    //event, en este tipo de funciones, representa el elemento al que esta asociada la funcion. En este caso el div del juego
    function updateRotation(event) {
        //Saco el centro del elemento, recibiendo el punto mas a la izquierda y sumandole la mitad de su longitud
        var elementCenterX = card.getBoundingClientRect().left + card.offsetWidth / 2;
        //Calculo la distancia del ratón al centro para rotar más o menos, el divisor permite controlar la sensibilidad
        rotationAngle = (event.clientX - elementCenterX) / 15 ;
        if(window.matchMedia("(min-width: 420px)").matches){
            card.style.transform = 'perspective(1000px) rotateY(' + rotationAngle + 'deg)';
        } 
    }    
    function resetRotation(event){
        if(window.matchMedia("(min-width: 420px)").matches){
            card.style.transform = 'perspective(1000px) rotateY(0)';
        }
    }

</script>

<div 
    bind:this={card}
    role="region" aria-label="Interactive Region"
    on:mousemove={updateRotation}
    on:mouseleave={resetRotation} 
    on:click={() => shopGameStore.openShop(game)}
    class="most-sold__game">
        <img class="most-sold__image" src={cover} alt="cover"/>
        <div class="most-sold__data">
            <p class="most-sold__name">{name}</p> 
            {#each genres as genre, index}
                <span>{genre}{index === genres.length - 1 ? '' : ', '}</span>
            {/each} 
        </div>
</div>

<style lang="scss">
    
    .most-sold{
        &__game{
            width: calc((100% - (2 * var(--gutter-horizontal))) / 3);
            height: 40vw;
            float: left;
            transition: all .4s;
            position: relative;
            
            &:not(:last-child){
                margin-right: var(--gutter-horizontal);
            }
            &:hover{
                cursor: pointer;
                transform-origin: center center;
                transition: all .1s;
                z-index: 5;
            }
            @media (max-width: 450px) {
                height: 120vw;
                width:60%;
                left: 50%;
                transform: translateX(-50%);
                
                &:not(:last-child){
                    margin-bottom: 2rem;
                } 
            }
            @media (min-width: 450px) {
                &:hover{
                    scale: 110%;
                }
            }
        }
        &__image{
            width: 100%;
            height: 75%;
            transition: all .4s;
            object-fit: cover;

            &:hover{
                box-shadow: 0 0 10px 2px lightgray;
                background-color: lightgray;
                filter: brightness(1.1);
            }
        }

        &__data{
            box-sizing: border-box;
            background-color: var(--game-data-bg-color);
            color: lightgray;
            font-weight: 400;
            width: 100%;
            height: 20%;
            font-size: 1.75rem;

            padding: .5rem;
            text-align: center;
            box-shadow: 3px 4px 15px 0.5px black;
            
            @media (max-width: 1500px) {
                font-size: 1.5rem;
            }
            @media (max-width: 1200px) {
                font-size: 1.25rem;
                height: 25%;
            } 
            @media (max-width: 900px) {
                padding: .1rem;
                font-size: .9rem;
                height: 13.5vw;
            } 
            @media (max-width: 650px) {
                font-size: .6rem;
            } 
            @media (max-width: 450px) {
                font-size: 1rem;
                height: 25vw;
            }
        }
        &__name{
            font-size: 1.5rem;
            font-weight: 700;
            line-height: 95%;
            margin: .25rem 0;
            
            @media (max-width: 1500px) {
                font-size: 1.25rem;
            }
            @media (max-width: 1200px) {
                font-size: 1rem;
            }
            @media (max-width: 650px) {
                font-size: .75rem;
                margin: .25rem 0;
            }          
            @media (max-width: 450px) {
                font-size: 1.5rem;
                margin: .5rem 0;
            }          
        }
    }
</style>