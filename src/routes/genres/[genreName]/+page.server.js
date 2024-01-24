export async function load({ params }) {
	const response = await fetch("http://localhost:4000/games");
	const games = await response.json();

	let genre = params.genreName;
	let gameList = [];

	games.forEach(element => {
		element.genres.includes(genre) ? gameList.push(element) : '';
	});

	return { genre, gameList };
}
