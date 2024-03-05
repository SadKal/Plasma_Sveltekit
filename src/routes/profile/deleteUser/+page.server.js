import { redirect } from '@sveltejs/kit';
import { verifyToken } from '$lib/utils/jwt';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const confirmation = data.get('deleteUser');

		if (confirmation === 'deleteUser') {

			const token = cookies.get('token');
			let tokenUsername;

			if (token) {
				const decodeToken = verifyToken(token);
				if (decodeToken) {
					tokenUsername = decodeToken.username;
				}
			}

			const userResponse = await fetch(`http://localhost:4000/users`);
			const users = await userResponse.json();

			const userFound = users.find((user) => user.username === tokenUsername);

			const deleteResponse = await fetch(`http://localhost:4000/users/${userFound.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (deleteResponse.ok) {
				const reviewResponse = await fetch(`http://localhost:4000/reviews`);
				const reviews = await reviewResponse.json();
				let updateReviews;
				for (let review of reviews) {
					review.reviews = review.reviews.filter(
						(delReviews) => delReviews.user !== userFound.username
					);
					updateReviews = await fetch(`http://localhost:4000/reviews/${review.id}`, {
						method: 'PATCH',
						body: JSON.stringify({ reviews: review.reviews }),
						headers: {
							'Content-Type': 'application/json'
						}
					});
				}

				cookies.delete('token', { path: '/' });
				throw redirect(303, `/`);
			}

		} else {
            return {
				error: true,
				message: 'No se ha podido borrar el usuarioc',
				
			};
        }
	}
};
