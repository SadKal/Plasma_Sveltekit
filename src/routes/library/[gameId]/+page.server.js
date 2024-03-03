import { SECRET_TWITCH_API_KEY, SECRET_TWITCH_API_BEARER } from '$env/static/private';
import { verifyToken } from '$lib/utils/jwt';
import { redirect } from '@sveltejs/kit';
import { verifyToken } from "$lib/utils/jwt";

export async function load({ params, parent, cookies }) {
    const token = cookies.get('token');
    const { gameId } = params;
    const { username } = await parent();
    const headers = {
        'Accept': 'application/json',
        'Client-ID': `${SECRET_TWITCH_API_KEY}`,
        'Authorization': `Bearer ${SECRET_TWITCH_API_BEARER}`
    }

    if (!username) {
        throw redirect(303 /*temporal redirect */, `/`);
    }

    const headers = {
        Accept: 'application/json',
        'Client-ID': `${SECRET_TWITCH_API_KEY}`,
        Authorization: `Bearer ${SECRET_TWITCH_API_BEARER}`
    };

    const gameResponse = await fetch('https://api.igdb.com/v4/games', {
        method: 'POST',
        headers: headers,
        body: `fields artworks.image_id,cover.image_id,name,screenshots.image_id,total_rating,first_release_date,updated_at,dlcs.cover.image_id,dlcs.name,expansions.cover.image_id,expansions.name,platforms; 
                    where id=(${gameId});`
    });

    const games = await gameResponse.json();
    let user;
    if (token) {
        const decodeToken = verifyToken(token);

        if (decodeToken) {
            user = decodeToken;
        }
    }
    const userResponse = await fetch(`http://localhost:4000/users/${user.id}`);
    user = await userResponse.json();
    console.log(user);

    const game = games[0];

    const gameData = user.games.find((toFind) => toFind.id === game.id)
    console.log(gameData);
    game.hoursplayed = gameData?.hoursplayed;
    game.buydate = gameData?.buydate;

    let auxArray = gameData.dlcs;
    let dlcs = [];
    let dlcID = [];

    if (auxArray != undefined && auxArray[0] != undefined) {
        auxArray.forEach((dlc) => {
            dlcID.push(dlc.id);
        });
    }

    if (dlcID.length > 0) {
        const dlcsResponse = await fetch('https://api.igdb.com/v4/games', {
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
}
