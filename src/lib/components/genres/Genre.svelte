<script>
	import { goto } from '$app/navigation';

	export let id;
	export let kind;
	export let name;
	export let bg_color;
	export let svg_src;
	export let text_color;
	export let index;
	index += 1;
	const link = kind + '-' + id;
</script>

<div
	class="genre genre--{index}"
	style="background-color: {bg_color};
            color: {text_color}"
	on:click={() => goto(`/genres/${link}`)}
>
	<object class="genre__svg" data={svg_src} type="image/svg+xml" width="70%" height="auto" />
	<div class="genre__name">
		{name}
	</div>
</div>

<style lang="scss">
	.genre {
		box-sizing: border-box;
		width: 100%;
		height: max-content;
		display: flex;
		flex-direction: column;
		align-items: center;

		position: relative;
		text-align: center;
		padding: 3rem 0 1.5rem;
		font-weight: 700;

		background-image: url('https://cdn.mos.cms.futurecdn.net/HsDtpFEHbDpae6wBuW5wQo.jpg');
		background-blend-mode: soft-light;
		background-size: cover;

		clip-path: polygon(0 0, 95% 0, 100% 100%, 5% 100%);

		&:not(:last-child) {
			margin-right: var(--gutter-horizontal);
		}

		transition: all 0.3s;
		&:hover {
			cursor: pointer;
		}

		&__name {
			margin-top: 2rem;
			@media (max-width: 750px) {
				font-size: 0.8rem;
				&:not(:last-child) {
					margin-bottom: 2rem;
				}
			}
		}

		&__svg {
			pointer-events: none;
		}

		@media (max-width: 420px) {
			width: 60%;
			left: 50%;
			transform: translateX(-50%);
			&:not(:last-child) {
				margin-bottom: 2rem;
			}
		}
		@media (min-width: 420px) {
			&:hover {
				scale: 120%;
			}
		}
	}
</style>
