<script>
	import Genre from "./Genre.svelte";

	export let genres;
</script>

<div class="genres">
	<div class="genres__title">Géneros Populares</div>
	<div class="genres__exhibitor">
		{#each genres as { name, bg_color, svg_src, text_color }, index}
			<Genre {name} {bg_color} {svg_src} {text_color} {index}/>
		{/each}
	</div>
</div>

<style lang="scss">
	.genres {
		width: 100%;
        text-align: center;
		
		&__exhibitor {
			margin-top: 3rem;
			display: grid;
			grid-template-columns: 20% 20% 20% 20%;
            justify-content: center;
            grid-gap: 5vh 0;
		}
		&__title {
			width: 100%;
			text-align: center;

			margin-top: 6rem;
			color: var(--text-color);
			font-size: 5rem;
			font-weight: 400;
			letter-spacing: 0.2rem;

			@media (max-width: 1024px) {
				font-size: 4rem;
				margin-top: 8rem;
			}
			@media (max-width: 750px) {
				font-size: 3rem;
			}
			@media (max-width: 420px) {
				font-size: 30px;
			}
		}

		&__row {
			margin-top: 5rem;
			margin-bottom: 5rem;

			@media (min-width: 420px) {
				&:not(:last-child) {
					margin-bottom: 2rem;
				}
			}
		}
	}
</style>
