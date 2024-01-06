<script>
    let today = new Date();
    let currentDay = today.getDay();
    let monday = new Date();
    let sunday = new Date();

    //Calculo el lunes. Resto al numero de dia del mes el numero de dias que llevamos de semana menos uno, asi siempre llego al dia del mes que corresponde al lunes
    monday.setDate(today.getDate() - (currentDay - 1));
    sunday.setDate(today.getDate() + (7 - currentDay));

    //Cambio de numero de mes a nombre de mes, para que ponga "noviembre" en vez de "10"(los meses cuenta de 0 a 11)
    const mondayMonth = monday.toLocaleString('default', { month: 'long' });
    const sundayMonth = sunday.toLocaleString('default', { month: 'long' });
</script>

<div class="novedades">
    <div class="novedades__title">
        Novedades
    </div>
    <div class="novedades__subtitle">
        (Semana del {monday.getDate()} de {mondayMonth} al {sunday.getDate()} de {sundayMonth})
    </div>
</div>

<style lang="scss"> 
    .novedades{  
        width: 100%;
        text-align: center;
        margin-top: 8vw;
        animation: fadein var(--seconds-fadein) ease-in;

        &__title{
            color: var(--text-color);
            font-size: 7rem;
            letter-spacing: .4rem;
            font-weight: 400;
            @media (max-width: 1050px){
                font-size: 5rem;
                letter-spacing: .8rem;
            }
            @media (max-width: 750px){
                margin-top: 25vw;
                font-size: 4.5rem;
                letter-spacing: .8rem;
            }
            @media (max-width: 600px){
                font-size: 3.5rem;
                letter-spacing: .6rem;
            }
            @media (max-width: 450px){
                font-size: 3rem;
                margin-top: 35vw;
                letter-spacing: .4rem;
            }
        }
        &__subtitle{
            color: var(--subtitle-text-color);
            font-size: 1.25rem;
            @media (max-width: 750px){
                margin-top: .7rem;
                font-size: 1rem;   
            }
            @media (max-width: 450px){
                margin-top: .7rem;
                font-size: 10px;   
            }
        }
    }
</style>