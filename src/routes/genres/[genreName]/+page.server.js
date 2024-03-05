import { SECRET_TWITCH_API_KEY, SECRET_TWITCH_API_BEARER } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export async function load({ params, url }) {
	const { genreName } = params;
	const currentGenre = genreName.split("-");
	let pagination = url.searchParams.get('page') || 1;
	let currentSort = url.searchParams.get('sort') || 'first_release_date';
	if (pagination < 0) {
		throw redirect(303, `/genres/${currentGenre[0] + '-' + currentGenre[1]}?page=0`);
	}
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
            where ${currentGenre[0].toLowerCase()}=(${currentGenre[1]}) & total_rating > 70 & 
			category != (1, 2, 3, 5, 11, 12, 14) & first_release_date < ${Math.floor(Date.now() / 1000)};
			sort ${currentSort} ${currentSort == 'name' ? 'asc' : 'desc'};
			limit 20;
			offset ${20 * (pagination - 1)};
			`
		});
	let games = await gamesResponse.json();


	return { genres, games, currentGenre, pagination, currentSort };
}
