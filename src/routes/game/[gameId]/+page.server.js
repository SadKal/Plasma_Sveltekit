export async function load({ params }) {
    const { gameId } = params;

    const gameResponse = await fetch(
        "https://api.igdb.com/v4/games",
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': 'x4yzimuddvbcwzwqwxb3mi69o19urh',
                'Authorization': 'Bearer 4cxn7og3bdosuzpdxslj3jcjl6hly9',
            },
            body: `fields artworks.image_id,cover.image_id,name,genres.name, screenshots.image_id; 
                    where id=(${gameId});`
        });

    const games = await gameResponse.json();

    console.log(games[0]);
    const game = games[0]
    return { game };
}  
