<script>
    import Slide from "./Slide.svelte";
    import cacheStore from '$lib/stores/cache';

    export let data;

    let isSwiping=false;
    let startSwipe; 
    let endSwipe;

    $cacheStore.gamesData = data.gamesData;
    console.log(data.gamesData);
    console.log($cacheStore.gamesData);

    //Registra el inicio del deslizamiento
    function swipeStart(event){
        startSwipe=event.touches[0].clientX;
        isSwiping=true;
    };

    //Registra el final del deslizamiento
    function swipeEnd(event) {
        if (isSwiping){
            endSwipe = event.touches[0].clientX;
        };            
    };

    //Ejecuta segun el deslizamiento
    function swipeAction() { 
        if (isSwiping){
            isSwiping = false;
            //Calculo cuanto ha deslizado y comparo con un minimo, para que no registre un toque como deslizamiento
            let pxMoved = endSwipe - startSwipe;
            const minDistance = 50; 
            if (Math.abs(pxMoved) > minDistance) {
                if (pxMoved < 0) {
                    //Deslizar IZDA
                    $cacheStore.showSlides(1);
                } else {
                    //Deslizar DCHA
                    $cacheStore.showSlides(-1);
                };
            };
        };
    };

</script>

<div class="slideshow clearfix" on:touchstart={swipeStart} on:touchmove={swipeEnd} on:touchend={swipeAction}>
    {#each Object.values($cacheStore.slides) as slide, index (slide.source)}
        <div class="slideshow__slide">
            {#key slide.position}
                <Slide src={slide.source} position={slide.position} {index} alt={$cacheStore.gamesData[slide.index].name}/>
            {/key}
        </div>
    {/each}   
</div>

<style lang="scss">
    .clearfix::after {
        content: ""; 
        clear: both;
        display: block;
    } 

    .slideshow{
        margin-top: 6rem; 
        animation: fadein var(--seconds-fadein) ease-in;  
        
        @media (max-width: 800px){
            margin-top: 7rem; 
        }

        &__slide{
            height: 100%;
            width: calc(100%/3);
            display: inline;
            float: left; 
            position: relative;  
        }  
    }
</style>

