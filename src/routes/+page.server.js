export async function load() {
    const responseGenres = await fetch("http://localhost:4000/genres");

    const genres = await responseGenres.json();

    //Slideshow games
    const [slidesResponse, bestRatedResponse] = await Promise.all([fetch(
        "https://api.igdb.com/v4/games",
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': 'x4yzimuddvbcwzwqwxb3mi69o19urh',
                'Authorization': 'Bearer 4cxn7og3bdosuzpdxslj3jcjl6hly9',
            },
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
            headers: {
                'Accept': 'application/json',
                'Client-ID': 'x4yzimuddvbcwzwqwxb3mi69o19urh',
                'Authorization': 'Bearer 4cxn7og3bdosuzpdxslj3jcjl6hly9',
            },
            body: `fields cover.image_id, name, genres.name, category;
                where total_rating > 90 & total_rating_count > 90 & artworks != null & cover != null & name != null & genres != null & category = (0, 3, 10);
                limit 6; 
                sort total_rating_count desc;`
        })]);

    const [slides, bestRated] = await Promise.all([slidesResponse.json(), bestRatedResponse.json()]);



    return { bestRated, slides, genres }
}