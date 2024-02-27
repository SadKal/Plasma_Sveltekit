import { SECRET_TWITCH_API_KEY, SECRET_TWITCH_API_BEARER } from '$env/static/private';

export async function load({ params }) {

    const { gameId } = params;
    const userResponse = await fetch('http://localhost:4000/users');

    const headers = {
        'Accept': 'application/json',
        'Client-ID': `${SECRET_TWITCH_API_KEY}`,
        'Authorization': `Bearer ${SECRET_TWITCH_API_BEARER}`
    }


    const gameResponse = await fetch(
        "https://api.igdb.com/v4/games",
        {
            method: 'POST',
            headers: headers,
            body: `fields artworks.image_id,cover.image_id,name,screenshots.image_id,total_rating,first_release_date,updated_at,dlcs.cover.image_id,dlcs.name,expansions.cover.image_id,expansions.name,platforms; 
                    where id=(${gameId});`
        });

    const games = await gameResponse.json();
    const users = await userResponse.json();
    const user = users.find(user => user.id === "1");

    const game = games[0];

    const dlcs = game?.dlcs;
    const expansions = game?.expansions;
    const extracontent = dlcs ? [...dlcs, ...(expansions || [])] : expansions || [];
    game.extracontent = extracontent;
    const gameData = user.games.find((toFind) => toFind.id === game.id)
    game.hoursplayed = gameData.hoursplayed;
    game.buydate = gameData.buydate;
    return { game };
}  