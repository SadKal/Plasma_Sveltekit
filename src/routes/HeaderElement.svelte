<script>
	export let name;
	export let subdirectory = '/';
</script>

<div class="topbar__element--container">
	<a class="topbar__element" href={subdirectory}>
		{name}
	</a>
</div>

<style lang="scss">
	.topbar__element--container {
		& a {
			padding: 1rem 2rem;
			font-size: 3rem;
			color: var(--text-color);
			text-decoration: none;
			transition: all 0.3s;

			@media (max-width: 800px) {
				font-size: 2rem;
			}

			&:hover {
				color: white;
			}
		}
	}
</style>
