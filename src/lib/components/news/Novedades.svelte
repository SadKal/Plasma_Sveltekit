<script>
	let today = new Date();
	let currentDay = today.getDay(); //del?
	let fourteenDaysAgo = new Date();

	//Calculo el lunes. Resto al numero de dia del mes el numero de dias que llevamos de semana menos uno, asi siempre llego al dia del mes que corresponde al lunes
	fourteenDaysAgo.setDate(today.getDate() - 14);

	//Cambio de numero de mes a nombre de mes, para que ponga "noviembre" en vez de "10"(los meses cuenta de 0 a 11)
	const todayMonth = today.toLocaleString('default', { month: 'long' });
	const fourteenDaysAgoMonth = fourteenDaysAgo.toLocaleString('default', { month: 'long' });
</script>

<div class="novedades">
	<div class="novedades__title">Novedades</div>
	<div class="novedades__subtitle">
		(Juegos lanzados entre el {fourteenDaysAgo.getDate()} de {fourteenDaysAgoMonth} y el {today.getDate()}
		de {todayMonth})
	</div>
</div>

<style lang="scss">
	.novedades {
		width: 100%;
		text-align: center;
		margin-top: 5rem;
		animation: fadein var(--seconds-fadein) ease-in;

		&__title {
			color: var(--text-color);
			font-size: 7rem;
			letter-spacing: 0.4rem;
			font-weight: 400;
			@media (max-width: 1050px) {
				font-size: 5rem;
				letter-spacing: 0.8rem;
			}
			@media (max-width: 750px) {
				margin-top: 25vw;
				font-size: 4.5rem;
				letter-spacing: 0.8rem;
			}
			@media (max-width: 600px) {
				font-size: 3.5rem;
				letter-spacing: 0.6rem;
			}
			@media (max-width: 450px) {
				font-size: 3rem;
				margin-top: 35vw;
				letter-spacing: 0.4rem;
			}
		}
		&__subtitle {
			color: var(--subtitle-text-color);
			font-size: 1.25rem;
			@media (max-width: 750px) {
				margin-top: 0.7rem;
				font-size: 1rem;
			}
			@media (max-width: 450px) {
				margin-top: 0.7rem;
				font-size: 10px;
			}
		}
	}
</style>
