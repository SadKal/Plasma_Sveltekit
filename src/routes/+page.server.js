import { SECRET_TWITCH_API_KEY, SECRET_TWITCH_API_BEARER } from '$env/static/private';

export async function load() {
    const responseGenres = await fetch("http://localhost:4000/genres");

    const genres = await responseGenres.json();

    const headers = {
        'Accept': 'application/json',
        'Client-ID': `${SECRET_TWITCH_API_KEY}`,
        'Authorization': `Bearer ${SECRET_TWITCH_API_BEARER}`
    }
    //Slideshow games
    const [slidesResponse, bestRatedResponse] = await Promise.all([fetch(
        "https://api.igdb.com/v4/games",
        {
            method: 'POST',
            headers: headers,
            body: `fields artworks.*, name;
            where first_release_date < ${Math.floor(Date.now() / 1000)} & first_release_date > ${Math.floor(Date.now() / 1000) - 15 * 24 * 60 * 60} & total_rating > 70 
            & artworks != null;
            limit 20;
            sort first_release_date desc;`
        }),
    fetch(
        "https://api.igdb.com/v4/games",
        {
            method: 'POST',
            headers: headers,
            body: `fields cover.image_id, name, genres.name, category;
                where total_rating > 90 & total_rating_count > 90 & artworks != null & cover != null & name != null & genres != null & category = (0, 3, 10);
                limit 6; 
                sort total_rating_count desc;`
        })]);

    const [slides, bestRated] = await Promise.all([slidesResponse.json(), bestRatedResponse.json()]);


    return { bestRated, slides, genres }
}