import { SECRET_TWITCH_API_KEY, SECRET_TWITCH_API_BEARER } from '$env/static/private';

export async function GET({ url }) {
    let toSearch = url.searchParams.get('q');
    let type = url.searchParams.get('type');

    console.log(type)
    const headers = {
        'Accept': 'application/json',
        'Client-ID': `${SECRET_TWITCH_API_KEY}`,
        'Authorization': `Bearer ${SECRET_TWITCH_API_BEARER}`,
        'Access-Control-Allow-Origin': '*'
    }
    let responseGames;
    switch (type) {
        case 'search':
            responseGames = await fetchSearchGame(headers, toSearch);
            break;
        case 'mostSold':
            responseGames = await fetchMostSold(headers, toSearch);
            break;
    }
    const respuesta = new Response(JSON.stringify(responseGames));
    return respuesta;
}
async function fetchMostSold(headers, offset) {
    const response = await fetch("https://api.igdb.com/v4/games",
        {
            method: 'POST',
            headers: headers,
            body: `fields cover.image_id, name, genres.name, category;
            where total_rating > 90 & total_rating_count > 90 & artworks != null & cover != null & name != null & genres != null & category = (0, 3, 10);
            limit 4;
            offset ${offset}; 
            sort total_rating_count desc;`
        });
    const newMostSold = await response.json();
    return newMostSold;
}
async function fetchSearchGame(headers, toSearch) {
    const response = await fetch(
        "https://api.igdb.com/v4/games",
        {
            method: 'POST',
            headers: headers,
            body: `
                fields artworks.image_id, name, category;
                where artworks != null & cover != null & name != null & genres != null 
                    & category != (11) & name ~ "${toSearch}"* & first_release_date < ${Math.floor(Date.now() / 1000)};
                limit 20; 
                sort total_rating:desc;
            `
        }
    );
    const responseGames = await response.json();
    return responseGames;

}