<script>
	import Genre from "./Genre.svelte";

	export let genres;
</script>

<div class="genres">
	<div class="genres__exhibitor">
		<div class="genres__title">Géneros Populares</div>
		<div class="genres__row clearfix">
			{#each genres.slice(0, 4) as { name, bg_color, svg_src, text_color }}
				<Genre {name} {bg_color} {svg_src} {text_color} />
			{/each}
		</div>
		<div class="genres__row clearfix">
			{#each genres.slice(4, 8) as { name, bg_color, svg_src, text_color }}
				<Genre {name} {bg_color} {svg_src} {text_color} />
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
	.genres {
		animation: fadein var(--seconds-fadein) ease-in;

		&__exhibitor {
			width: 80%;
			position: relative;
			left: 50%;
			transform: translateX(-50%);
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
