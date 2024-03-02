<script>
	import Slide from './Slide.svelte';
	import { goto } from '$app/navigation';

	export let slides;

	let isSwiping = false;
	let startSwipe;
	let endSwipe;
	let cache = [];

	let slidesData = {
		left: {
			source: slides[0].artworks[0].image_id,
			index: 0,
			position: '--side'
		},
		center: {
			source: slides[1].artworks[0].image_id,
			index: 1,
			position: '--center'
		},
		right: {
			source: slides[2].artworks[0].image_id,
			index: 2,
			position: '--side'
		}
	};

	//Registra el inicio del deslizamiento
	function swipeStart(event) {
		startSwipe = event.touches[0].clientX;
		isSwiping = true;
	}

	//Registra el final del deslizamiento
	function swipeEnd(event) {
		if (isSwiping) {
			endSwipe = event.touches[0].clientX;
		}
	}

	//Ejecuta segun el deslizamiento
	function swipeAction() {
		if (isSwiping) {
			isSwiping = false;
			//Calculo cuanto ha deslizado y comparo con un minimo, para que no registre un toque como deslizamiento
			let pxMoved = endSwipe - startSwipe;
			const minDistance = 50;
			if (Math.abs(pxMoved) > minDistance) {
				if (pxMoved < 0) {
					//Deslizar IZDA
					showSlides(1);
				} else {
					//Deslizar DCHA
					showSlides(-1);
				}
			}
		}
	}

	function showSlides(n) {
		if (n == 0) {
			let shopGame = slides.find((game) => game.artworks[0].image_id == slidesData.center.source);
			goto(`/game/${shopGame.id}`);
		}

		const border = n === +1 ? 0 : slides.length - 1;
		//Por cada slide, actualizamos el indice de slides y la imagen a mostrar
		Object.values(slidesData).forEach((slide) => {
			slide.index = slides[slide.index + n] == null ? border : slide.index + n;
			slide.source = slides[slide.index].artworks[0].image_id;

			slidesData = slidesData;
		});
	}
</script>

<div class="slideshow" on:touchstart={swipeStart} on:touchmove={swipeEnd} on:touchend={swipeAction}>
	{#each Object.values(slidesData) as slide, index (slide.source)}
		<div class="slideshow__slide">
			{#key slide.position}
				<Slide
					src={slide.source}
					position={slide.position}
					{index}
					alt={slides[slide.index].name}
					bind:cache
					handleClick={showSlides}
				/>
			{/key}
		</div>
	{/each}
</div>

<style lang="scss">
	.slideshow {
		display: flex;
		height: 17vw;
		margin-top: 6rem;
		animation: fadein var(--seconds-fadein) ease-in;

		@media (max-width: 800px) {
			margin-top: 7rem;
		}

		&__slide {
			height: 100%;
			width: calc(100% / 3);
			position: relative;
		}
	}
</style>
