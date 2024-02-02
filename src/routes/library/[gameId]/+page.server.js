export async function load({ params }) {
    const { gameId } = params;
    const userResponse = await fetch('http://localhost:4000/users');

    const gameResponse = await fetch(
        "https://api.igdb.com/v4/games",
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': 'x4yzimuddvbcwzwqwxb3mi69o19urh',
                'Authorization': 'Bearer 4cxn7og3bdosuzpdxslj3jcjl6hly9',
            },
            body: `fields artworks.image_id,cover.image_id,name,screenshots.image_id,total_rating,first_release_date,updated_at,dlcs,expansions; 
                    where id=(${gameId});`
        });

    const games = await gameResponse.json();
    const users = await userResponse.json();
    const user = users.find(user => user.id === "1");

    const game = games[0];
    const gameData = user.games.find((toFind) => toFind.id === game.id)
    game.hoursplayed = gameData.hoursplayed;
    game.buydate = gameData.buydate; 

    console.log(game);
    return { game };
}  