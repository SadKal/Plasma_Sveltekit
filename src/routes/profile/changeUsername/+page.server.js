import { redirect } from '@sveltejs/kit';
import { verifyToken, signToken } from '$lib/utils/jwt';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData(); //Cojo los datos del form
		const formOldUser = data.get('oldusername'); //Cojo el nombre de usuario antiguo.
		const formNewUser = data.get('newusername'); //Cojo el nombre de usuario nuevo.
		const formPassword = data.get('password');

		let tokenUsername;
		let userFound;

		const token = cookies.get('token');
		if (token) {
			const decodeToken = verifyToken(token);
			if (decodeToken) {
				tokenUsername = decodeToken.username;
			}
		}

		const userResponse = await fetch('http://localhost:4000/users'); //Entro en el json donde tengo los usuarios
		const reviewResponse = await fetch('http://localhost:4000/reviews');
		const users = await userResponse.json(); //Y le digo que me lo meta en una constante y que es de tipo json
		const reviews = await reviewResponse.json();

		if (formOldUser === tokenUsername) {
			userFound = users.find(
				(user) => user.username === tokenUsername && user.password === formPassword
			); //Miro que el nombre de usuario nuevo no este en la base de datos. Si lo esta guardo sus datos en userFound
		}
		if (userFound) {
			const updateUser = {
				...userFound,
				username: formNewUser // Actualiza específicamente el campo del nombre de usuario
			};

			const updateResponse = await fetch(`http://localhost:4000/users/${userFound.id}`, {
				method: 'PUT',
				body: JSON.stringify(updateUser),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (updateResponse.ok) {
				for (const reviewGame of reviews) {
					for (const specificReview of reviewGame.reviews) {
						if (specificReview.user === formOldUser) {
							specificReview.user = formNewUser;
						}
					}
				}

				let updateReviewsResponse;
				for (const review of reviews) {
					updateReviewsResponse = await fetch(`http://localhost:4000/reviews/${review.id}`, {
						method: 'PATCH',
						body: JSON.stringify({ reviews: review.reviews }),
						headers: {
							'Content-Type': 'application/json'
						}
					});
				}

				if (updateReviewsResponse.ok) {
					const newToken = signToken(updateUser);
					cookies.set('token', newToken, { path: '/' });
					throw redirect(302, '/');
				}
			}

			return {
				error: true,
				message: 'No se ha podido cambiar el nombre de usuario',
				formOldUser
			};
		}
	}
};
