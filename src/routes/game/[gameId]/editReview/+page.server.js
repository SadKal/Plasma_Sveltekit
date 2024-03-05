import { SECRET_TWITCH_API_KEY, SECRET_TWITCH_API_BEARER } from '$env/static/private';
import { verifyToken, signToken } from '$lib/utils/jwt';
import { redirect } from '@sveltejs/kit';

export async function load({ params, cookies }) {
    const token = cookies.get('token');
    const { gameId } = params;
    console.log(gameId);

    let user;
    if (token) {
        const decodeToken = verifyToken(token);

        if (decodeToken) {
            const userToken = decodeToken;
            const responseUser = await fetch(`http://localhost:4000/users/${userToken.id}`);
            user = await responseUser.json();
        }
    }


    if (user) {
        try {
            const reviewsResponse = await fetch(`http://localhost:4000/reviews/${gameId}`)
            const reviews = await reviewsResponse.json();

            const currentReview = reviews.reviews.find((review) => review.user == user.username);
            return currentReview;


        } catch (err) {
            throw redirect(302, `/`);
        }
    } else {
        throw redirect(302, `/game/${gameId}`);
    }
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
                const userToken = decodeToken;
                const responseUser = await fetch(`http://localhost:4000/users/${userToken.id}`);
                user = await responseUser.json();
            }
        }
        const newReview = {
            "id": parseInt(data.get('id')),
            "title": data.get('title'),
            "content": data.get('content'),
            "value": data.get('review-value'),
            "user": user.username
        }

        try {
            const reviewsResponse = await fetch(`http://localhost:4000/reviews/${gameId}`)
            const reviews = await reviewsResponse.json();

            const updatedReviews = [...reviews.reviews].map((review) => {
                if (review.id === parseInt(data.get('id'))) {
                    return newReview;
                } else {
                    return review;
                }
            })
            const response = await fetch(`http://localhost:4000/reviews/${gameId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ reviews: updatedReviews })
            }
            );


        } catch (err) {
            console.error('Error updating reviews:', err);
        }
        throw redirect(302, `/game/${gameId}`);


    }
}
