import { SECRET_TWITCH_API_KEY, SECRET_TWITCH_API_BEARER } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export async function load({ params, parent }) {

    const { gameId } = params;
    const userResponse = await fetch('http://localhost:4000/users');
    const { username } = await parent();
    const headers = {
        'Accept': 'application/json',
        'Client-ID': `${SECRET_TWITCH_API_KEY}`,
        'Authorization': `Bearer ${SECRET_TWITCH_API_BEARER}`
    }

    if (!username) {
        throw redirect(303 /*temporal redirect */, `/login?redirectTo=${url.pathname}`);
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

    const gameData = user.games.find((toFind) => toFind.id === game.id)
    game.hoursplayed = gameData.hoursplayed;
    game.buydate = gameData.buydate;

    let auxArray = [gameData.dlcs];
    let dlcs = [];
    let dlcID = [];
    if (auxArray[0] != undefined) {
        auxArray.forEach(dlc => { dlcID.push(dlc.id); });
    }

    if (dlcID.length > 0) {
        const dlcsResponse = await fetch(
            "https://api.igdb.com/v4/games",
            {
                method: 'POST',
                headers: headers,
                body: `fields cover.image_id,name, category; 
                    where id=(${dlcID.toString()});
                    limit ${dlcID.length};
                    sort first_release_date asc;`
            });
        dlcs = await dlcsResponse.json();
    }
       

    return { game, dlcs };
}  