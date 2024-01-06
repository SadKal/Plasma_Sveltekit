<script>
    export let name;
</script>

<li class="topbar__element--container">
    <a
        class="topbar__element" 
        href="/" 
        >
        {name}    
    </a>  
</li>

<style lang="scss">
    li{
        & a{
            padding: 1rem 2rem .5rem;
            font-size: 2.5rem;
            color: var(--text-color);
            text-decoration: none;
            transition: all .3s;
            float: left;

            @media (max-width: 750px) {
                font-size: 2rem;
            } 
            @media (max-width: 650px) {
                float: none;
            } 

            &:hover{
                color: white;
            }
            
            &.active{ 
                color: var(--selected-text-color);
                text-shadow: 
                        0 0 1rem var(--selected-text-color)
                    ,
                        0 0 .5rem black;
            }
        }
    }
</style>