<script>
	export let title = '';
	export let content = '';
	export let font_size = '1.1rem';
	export let header_font_size = '2rem';
	export let darkBG = false;
</script>

<div class="shopPageTextField" style="font-size: {font_size};">
	<h1 style="font-size: {header_font_size};">{title}</h1>

	{#if Array.isArray(content)}
		{#each content as element}
			<p class="textField__p" class:darkBG>{element}</p>
		{/each}
	{:else}
		<p class="textField__p" class:darkBG>{content}</p>
	{/if}
</div>

<style lang="scss">
	.shopPageTextField {
		& h1 {
			color: var(--subtitle-text-color);
		}
		& .textField__p {
			color: var(--text-color);
			font-weight: 500;
			line-height: 180%;
			margin: 3px 0;

			&.darkBG {
				color: #fff;
				font-weight: 500;
				line-height: 180%;
				margin: 3px 0;
			}
		}
	}
</style>
