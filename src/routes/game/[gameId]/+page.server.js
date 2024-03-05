import { SECRET_TWITCH_API_KEY, SECRET_TWITCH_API_BEARER } from '$env/static/private';
import { verifyToken, signToken } from '$lib/utils/jwt';

export async function load({ params }) {
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

    return { game, dlcs, gamesFromSeries, reviews };
}

export const actions = {
    postReview: async ({ cookies, request, params }) => {
        const { gameId } = params;
        const token = cookies.get('token');
        const data = await request.formData();

        let user;
        if (token) {
            const decodeToken = verifyToken(token);

            if (decodeToken) {
                const userToken = decodeToken;
                const responseUser = await fetch(`http://localhost:4000/users/${userToken.id}`);
                user = await responseUser.json();
            }
        }

        const id = parseInt(data.get('id'));
        const title = data.get('title');
        const content = data.get('content');
        const value = data.get('review-value') == "positive" ? true : false;
        const username = user.username;

        try {
            const reviewsResponse = await fetch(`http://localhost:4000/reviews/${gameId}`)
            const reviews = await reviewsResponse.json();

            const newReview = {
                "id": id,
                "title": title,
                "content": content,
                "value": value,
                "user": username
            }
            if (reviews.reviews) {
                const newReviews = [...reviews.reviews, newReview];
                const response = await fetch(`http://localhost:4000/reviews/${gameId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ reviews: newReviews })
                }
                );
            } else {
                const response = await fetch(`http://localhost:4000/reviews/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: parseInt(gameId), reviews: [newReview] })
                }
                );
            }
        }
        catch (err) {
            console.error('Error updating reviews:', err);
        }
    },
    deleteReview: async ({ cookies, request, params }) => {
        const data = await request.formData();
        const game = data.get('game');
        const token = cookies.get('token');
        const { gameId } = params;

        let user;
        if (token) {
            const decodeToken = verifyToken(token);

            if (decodeToken) {
                const userToken = decodeToken;
                const responseUser = await fetch(`http://localhost:4000/users/${userToken.id}`);
                user = await responseUser.json();
            }
        }
        try {
            const reviewsResponse = await fetch(`http://localhost:4000/reviews/${gameId}`)
            const reviews = await reviewsResponse.json();

            for (const review of reviews.reviews) {
                console.log(review)
            }

            const newReviews = reviews.reviews.filter((review) => review.user != user.username);
            const response = await fetch(`http://localhost:4000/reviews/${gameId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ reviews: newReviews })
            }
            );

        }
        catch (err) {
            console.error('Error updating reviews:', err);
        }

    }
};
