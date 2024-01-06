import games from "$lib/data/games.json";

export async function load({ params }) {
    const genre = params.genreName
	
	let gameList=[];

	games.data.forEach(element => {
		element.genres.includes(genre) ? gameList.push(element) : '';
	});
	

    return { genre, gameList };
}
