<script>
    import Searchbar from "./Searchbar.svelte";
    import Novedades from "./Novedades.svelte";
    import Slideshow from './Slideshow.svelte';
	import { onMount } from "svelte";
    
    function scrollOnLoad() {
		requestAnimationFrame(() => {
			if (window.matchMedia("(max-width: 420px)").matches) {
				window.scrollTo(0, 60);
			} else {
				window.scrollTo(0, 90);
			}
		});
	}

    onMount(() => {
        if ("scrollRestoration" in history) {
			history.scrollRestoration = "manual";
		}
        scrollOnLoad();
    });
</script>

<Searchbar/>

<Novedades/>



<div style="height: 40000px"> 
    p
</div>