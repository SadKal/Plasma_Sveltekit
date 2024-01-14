<script>
    import MostSoldGame from "./MostSoldGame.svelte";
    
    export let mostSold;
</script>

<div class="most-sold">
    <div class="most-sold__title">
        Más Vendidos
    </div> 
    <div class="most-sold__exhibitor"> 
        <div class="most-sold__row clearfix">
            {#each mostSold.slice(0,3) as game}
                <MostSoldGame {game}/>
            {/each}
        </div>

        <div class="most-sold__row clearfix">
            {#each mostSold.slice(3,6) as game}
                <MostSoldGame {game}/>
            {/each}
        </div>
    </div>
</div>

<style lang="scss">
    .clearfix::after {
        content: ""; 
        clear: both;
        display: block;
    } 

    .most-sold{
        width: 100%;
        text-align: center;
        margin-top: 15vw;
        animation: fadein var(--seconds-fadein) ease-in;

        @media (max-width: 450px) {
            margin-top: 4rem;
        }
        
        &__title{
            color: var(--text-color); 
            font-size: 6rem;
            font-weight: 400;
            letter-spacing: .2rem;

            @media (max-width: 1050px) {
                font-size: 4rem;
            }
            @media (max-width: 750px) {
                font-size: 3rem;
            }
            @media (max-width: 450px) {
                font-size: 2rem;
            }
        } 

        &__exhibitor{
            width: 70%;
            margin-top: 4rem;
            position: relative; 
            display: flex;
            flex-wrap: wrap;
            left: 50%;
            transform: translateX(-50%);
            @media (max-width: 450px) {
                width: 100%;
            }
        }

        &__row{
            &:not(:last-child){
                margin-bottom: 3rem;
            }
            @media (max-width: 450px) {
                &:not(:last-child){
                    margin-bottom: 2rem;
                }
            }
        }

    }
</style>