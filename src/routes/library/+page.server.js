import { redirect } from '@sveltejs/kit';
import { SECRET_TWITCH_API_KEY, SECRET_TWITCH_API_BEARER } from '$env/static/private';

export async function load({ parent, url }) {
    const user = await parent();
    const headers = {
        'Accept': 'application/json',
        'Client-ID': `${SECRET_TWITCH_API_KEY}`,
        'Authorization': `Bearer ${SECRET_TWITCH_API_BEARER}`
    }
    if (!user.username) {
        throw redirect(303 /*temporal redirect */, `/login?redirectTo=${url.pathname}`);
    }

    let gamesToSearch = ''
    for (const game of user.games) {
        gamesToSearch += game.id + ','
    }
    gamesToSearch = gamesToSearch.substring(0, gamesToSearch.length - 1);

    const gameResponse = await fetch(
        "https://api.igdb.com/v4/games",
        {
            method: 'POST',
            headers: headers,
            body: `fields cover.image_id,name; 
                    where id=(${gamesToSearch});
                    limit ${gamesToSearch.length};`
        });

    const games = await gameResponse.json();

    user.games = user.games.map((userGame) => { return { ...games.find((game) => userGame.id === game.id), ...userGame } });

    return user;

} 
