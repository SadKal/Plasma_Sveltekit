export async function GET({ url }) {
    let toSearch = url.searchParams.get('q')
    //console.log(gameReceived);
    // const game = gameReceived;
    // game = game.trim();
    // console.log(game);
    // const searchResponse =

    // const search = await searchResponse.json();
    const response = await fetch(
        "https://api.igdb.com/v4/games",
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': 'x4yzimuddvbcwzwqwxb3mi69o19urh',
                'Authorization': 'Bearer 4cxn7og3bdosuzpdxslj3jcjl6hly9',
                'Access-Control-Allow-Origin': '*'
            },
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