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
            body: `fields artworks.image_id,cover.image_id,name,genres.name, 
            screenshots.image_id, total_rating, collections.name, collections.games, summary, storyline, game_localizations.name; 
                    where id=(${gameId});`
        });
    const games = await gameResponse.json();
    const game = games[0]

    let gamesFromSeries = [];
    if (game.collections) {
        const gamesSeriesResponse = await fetch(
            "https://api.igdb.com/v4/games",
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Client-ID': 'x4yzimuddvbcwzwqwxb3mi69o19urh',
                    'Authorization': 'Bearer 4cxn7og3bdosuzpdxslj3jcjl6hly9',
                },
                body: `fields artworks.image_id,name; 
                    where id=(${game.collections[0].games.toString()}) & category = 0;
                    limit ${game.collections[0].games.length};
                    sort first_release_date asc;`
            });
        gamesFromSeries = await gamesSeriesResponse.json();
    }
    console.log(game);


    return { game, gamesFromSeries };
}
