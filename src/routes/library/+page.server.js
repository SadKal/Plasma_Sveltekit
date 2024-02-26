<<<<<<< HEAD
import { redirect } from '@sveltejs/kit';


export const load = async ({ parent, url }) => {
	const { username } = await parent();

	if (!username) {
		throw redirect(303 /*temporal redirect */, `/login?redirectTo=${url.pathname}`);
	}
	
};
=======
export async function load({ cookies }) {
    const response = await fetch('http://localhost:4000/users');
    const users = await response.json();

    const user = users.find(user => user.id === "1");

    let gamesToSearch = ''
    for (const game of user.games) {
        gamesToSearch += game.id + ','
    }
    gamesToSearch = gamesToSearch.substring(0, gamesToSearch.length - 1);

    const gameResponse = await fetch(
        "https://api.igdb.com/v4/games",
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': 'x4yzimuddvbcwzwqwxb3mi69o19urh',
                'Authorization': 'Bearer 4cxn7og3bdosuzpdxslj3jcjl6hly9',
            },
            body: `fields cover.image_id,name; 
                    where id=(${gamesToSearch});
                    limit ${gamesToSearch.length};`
        });

    const games = await gameResponse.json();


    user.games = user.games.map((userGame) => { return { ...games.find((game) => userGame.id === game.id), ...userGame } });

    return user;

} 
>>>>>>> refs/remotes/origin/main
