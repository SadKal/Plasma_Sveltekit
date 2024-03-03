import { SECRET_TWITCH_API_KEY, SECRET_TWITCH_API_BEARER } from '$env/static/private';
import { verifyToken } from "$lib/utils/jwt";

export async function load({ params, cookies }) {
    const token = cookies.get('token');
    const { gameId } = params;

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
            body: `fields artworks.image_id,cover.image_id,name,genres.name, 
            screenshots.image_id, total_rating, collections.name, collections.games, summary, 
            storyline, game_localizations.name, dlcs.id, expansions.id, category, 
            involved_companies.company.name, involved_companies.company.logo.image_id,
            platforms.name, platforms.platform_logo.image_id, videos.*, parent_game.name; 
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
                headers: headers,
                body: `fields artworks.image_id,name; 
                    where id=(${game.collections[0].games.toString()}) & category = 0;
                    limit ${game.collections[0].games.length};
                    sort first_release_date asc;`
            });
        gamesFromSeries = await gamesSeriesResponse.json();
    }
    let dlcs = [];
    let dlcID = [];
    game.dlcs?.forEach(dlc => { dlcID.push(dlc.id); });
    game.expansions?.forEach(dlc => { dlcID.push(dlc.id); });
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

    const reviewsResponse = await fetch(`http://localhost:4000/reviews/${gameId}`);
    const reviews = await reviewsResponse.json();
    let user;
    if (token) {
        const decodeToken = verifyToken(token);

        if (decodeToken) {
            user = decodeToken;
            const userResponse = await fetch(`http://localhost:4000/users/${user.id}`);
            user = await userResponse.json();
        }
    }
    console.log("USUARIO: ", user);




    return { game, dlcs, gamesFromSeries, reviews, user };
}

export const actions = {
    default: async ({ cookies, request, params }) => {
        const { gameId } = params;
        const token = cookies.get('token');
        const data = await request.formData();
        let user;
        if (token) {
            const decodeToken = verifyToken(token);

            if (decodeToken) {
                user = decodeToken;
            }
        }

        console.log(user);
        console.log(data);

        try {
            const reviewsResponse = await fetch(`http://localhost:4000/reviews/${gameId}`)
            const reviews = await reviewsResponse.json();

            const newReview = {
                "id": reviews.reviews[reviews.reviews.length - 1]
            }
        }
        catch (err) {
            console.error('Error updating reviews:', err);
        }
    }
};
