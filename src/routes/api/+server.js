import { SECRET_TWITCH_API_KEY, SECRET_TWITCH_API_BEARER } from '$env/static/private';

export async function GET({ url }) {
    let toSearch = url.searchParams.get('q')

    const headers = {
        'Accept': 'application/json',
        'Client-ID': `${SECRET_TWITCH_API_KEY}`,
        'Authorization': `Bearer ${SECRET_TWITCH_API_BEARER}`,
        'Access-Control-Allow-Origin': '*'
    }
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
    const respuesta = new Response(JSON.stringify(responseGames));
    return respuesta;
}