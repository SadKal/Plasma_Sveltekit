<script>
	import { goto } from '$app/navigation';

	export let game;
	export let index;
	index += 1;

	let cover = game.cover.image_id;
	let name = game.name;
	let genres = game.genres;

	//Variables que guardan el angulo con el que rota la imagen y el elemento a rotar
	let rotationAngle = 0;
	let card;

	//event, en este tipo de funciones, representa el elemento al que esta asociada la funcion. En este caso el div del juego
	function updateRotation(event) {
		//Saco el centro del elemento, recibiendo el punto mas a la izquierda y sumandole la mitad de su longitud
		var elementCenterX = card.getBoundingClientRect().left + card.offsetWidth / 2;
		//Calculo la distancia del ratón al centro para rotar más o menos, el divisor permite controlar la sensibilidad
		rotationAngle = (event.clientX - elementCenterX) / 15;
		if (window.matchMedia('(min-width: 420px)').matches) {
			card.style.transform = 'perspective(1000px) rotateY(' + rotationAngle + 'deg)';
		}
	}

	function resetRotation(event) {
		if (window.matchMedia('(min-width: 420px)').matches) {
			card.style.transform = 'perspective(1000px) rotateY(0)';
		}
	}
</script>

<div
	bind:this={card}
	role="region"
	aria-label="Interactive Region"
	on:mousemove={updateRotation}
	on:mouseleave={resetRotation}
	on:click={() => goto(`/game/${game.id}`)}
	class="most-sold__game most-sold__game--{index}"
>
	<img
		class="most-sold__image"
		src="https://images.igdb.com/igdb/image/upload/t_cover_big/{cover}.png"
		alt="cover"
	/>
	<div class="most-sold__data">
		<p class="most-sold__name">{name}</p>
		{#each genres as genre, index}
			<span class="most-sold__genre">{genre.name}{index === genres.length - 1 ? '' : ', '}</span>
		{/each}
	</div>
</div>

<style lang="scss">
	.most-sold {
		&__game {
			width: 100%;
			height: 100%;
			transition: all 0.4s;
			position: relative;

			&:hover {
				cursor: pointer;
				transform-origin: center center;
				transition: all 0.1s;
				z-index: 5;
			}

			@media (max-width: 450px) {
				height: 120vw;
				width: 100%;
				left: 50%;
				transform: translateX(-50%);

				&:not(:last-child) {
					margin-bottom: 2rem;
				}
			}
			@media (min-width: 450px) {
				&:hover {
					scale: 110%;
				}
			}
		}
		&__image {
			width: 100%;
			height: 75%;
			transition: all 0.4s;
			object-fit: cover;

			&:hover {
				box-shadow: 0 0 10px 2px lightgray;
				background-color: lightgray;
				filter: brightness(1.1);
			}
		}

		&__data {
			box-sizing: border-box;
			background-color: var(--game-data-bg-color);
			color: lightgray;
			font-weight: 400;
			width: 100%;
			height: 20%;
			font-size: 1.75rem;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;

			padding: 0.5rem;
			text-align: center;
			box-shadow: 3px 4px 15px 0.5px black;
		}
		&__name {
			font-size: 1.5rem;
			font-weight: 700;
			line-height: 95%;
			margin: 0.25rem 0;
			left: 0;
			position: relative;
			transition: all 3s;
			text-align: center;
			overflow: visible;
			white-space: wrap;
		}

		&__genre {
			font-size: 1.3rem;
		}
	}
</style>
