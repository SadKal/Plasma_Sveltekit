<script>
    import { onMount } from "svelte";
    import cacheStore from "$lib/stores/cache";
    

    export let src;
    export let alt;
    export let position;
    export let index;

    let positionClass = 'slide__img' + position; 
    let nameClass = 'slide__title' + position;

    let placeholderImage= "/loading.gif";
    let img;

    //Creo una imagen "falsa" en la que cargaré el link de fondo
    let tempImg; 

    function onImgLoaded() {
        //Asigno a la imagen definitiva el link ya cargado
        img.src = tempImg.src;
        //Si la imagen no está cacheada, la cacheo, esto es para que las imagenes ya cargadas no tengan que volver a tener placeholder
        if (!$cacheStore.cache.includes(src)){
            $cacheStore.cache.push(src);
        }     
    }  

    //Funcion encargada de la carga de imagenes
    function loadImg(source) {
        tempImg.src = source;
        //Creo un listener, para que cuando cargue la imagen lance la funcion encargada de asignar
        tempImg.addEventListener('load', onImgLoaded);
    }

    onMount(() => {
        tempImg = new Image();
        //Compruebo si la imagen ya esta cargada
        if($cacheStore.cache.includes(src)){
            img.src=src;
        }
        else{
            loadImg(src);
        }

        return () => {
            tempImg.removeEventListener('load', onImgLoaded);  
        }
    }); 
</script>

<div class="slide">
    <a class="slide__link" href="/" on:click|preventDefault={() => $cacheStore.showSlides(index-1)}>
        <img bind:this={img} src={placeholderImage} alt={alt} class="slide__img {positionClass}"/>
        <div class="slide__title--container {nameClass}">
            <div class="slide__title {nameClass}">{alt}</div>
        </div>
    </a> 
</div>

<style lang="scss">
    .slide{
        
        height: 100%;
        width: 100%;
        position: relative;
        cursor: pointer;

        transition: all .3s;
        &:hover{
            box-shadow: 0 0 20px 5px white; 
        }
        
        &__img{
            width: 100%;
            height: 100%;
            object-fit: fill;
            position: relative; 

            &--side{
                opacity: 50%;
            }

            &--center{           
                clip-path: polygon(5% 0, 100% 0%, 95% 100%, 0% 100%);
                z-index: 2; 
                scale: 140%;

                transition: all .3s;
                @media (max-width: 450px){
                    scale: 230%;
                }
                &:hover{
                    filter: brightness(.6);
                }
            }
        }

        &__title{
            color: var(--text-color);
            font-size: 2rem;
            font-weight: 700;
            padding: 1rem;
            text-align: center;
            user-select: none;
            cursor: pointer;

            @media (max-width: 1300px) {
                font-size: 1.5rem;
            }
            @media (max-width: 800px) {
                font-size: 1rem;
            }
            @media (max-width: 600px) {
                display: none;
            }

            &--side{
                bottom: 0;
                opacity: 85%;
                background-color: var(--game-title-background-color);  
            }
            &--center{
                z-index: 10;
                color: var(--game-title-color-center);
                background-color: var(--game-title-background-color-center);
                bottom: -18%;   
                clip-path: polygon(10% 0, 100% 0%, 90% 100%, 0% 100%);

                @media (max-width: 800px) {
                    bottom: -17%;
                }   
            }

            &--container{
                width: 100%;
                position: absolute;
            }
        }
    }

</style>