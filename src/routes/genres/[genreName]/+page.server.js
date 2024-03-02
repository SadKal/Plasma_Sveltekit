import { SECRET_TWITCH_API_KEY, SECRET_TWITCH_API_BEARER } from '$env/static/private';

export async function load({ params }) {
	const { genreName } = params;
	const currentGenre = genreName.split("-");

	const headers = {
		'Accept': 'application/json',
		'Client-ID': `${SECRET_TWITCH_API_KEY}`,
		'Authorization': `Bearer ${SECRET_TWITCH_API_BEARER}`
	}
	const responseGenres = await fetch(
		"https://api.igdb.com/v4/multiquery",
		{
			method: 'POST',
			headers: headers,
			body: `
			query genres "Genres" {
				fields id, name;
					sort id asc;
				limit 500;
			
			};
			query themes "Themes" {
				fields id, name;
					sort id asc;
				limit 500;
			};`
		});
	const genresDivided = await responseGenres.json();

	let genres = [];
	genresDivided.forEach(field => {
		field.result.forEach(genre => {
			genres.push({
				id: genre.id,
				name: genre.name,
				kind: field.name
			})
		});
	});


	const gamesResponse = await fetch(
		"https://api.igdb.com/v4/games",
		{
			method: 'POST',
			headers: headers,
			body: `fields artworks.image_id,name,genres.name, themes.name, 
            screenshots.image_id; 
            where ${currentGenre[0].toLowerCase()}=(${currentGenre[1]}) & total_rating > 70 & category != (1, 2);
			sort first_release_date desc;
			limit 100;`
		});
	let games = await gamesResponse.json();

	console.log(games);

	return { genres, games, currentGenre };
}
