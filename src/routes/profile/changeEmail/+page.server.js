import { redirect } from '@sveltejs/kit';
import { verifyToken, signToken } from '$lib/utils/jwt';

//Esto sirve para actualizar el nombre de usuario y el email.
const mensajeError = 'No ha salido bien';
export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const formOldEmail = data.get('oldemail');
		const formNewEmail = data.get('newemail');
		const formUsername = data.get('username');

		let tokenUsername;
		let userFound;

		const token = cookies.get('token');
		if (token) {
			const decodeToken = verifyToken(token);
			if (decodeToken) {
				tokenUsername = decodeToken.username;
			}
		}

		const response = await fetch('http://localhost:4000/users');
		const users = await response.json();

		if (formUsername === tokenUsername) {
			userFound = users.find((user) => user.username === tokenUsername && user.email === formOldEmail); //Miro que el nombre de usuario nuevo no este en la base de datos. Si lo esta guardo sus datos en userFound
		}

		if (userFound) {
			const updateUser = {
				...userFound,
				email: formNewEmail
			};

			const updateResponse = await fetch(`http://localhost:4000/users/${userFound.id}`, {
				method: 'PUT',
				body: JSON.stringify(updateUser),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (updateResponse.ok) {
				let username = formUsername;
				const newToken = signToken(updateUser);
				cookies.set('token', newToken, { path: '/' });
				throw redirect(302, '/');
			}
		}

		return {
			error: true,
			message: mensajeError,
			formOldEmail
		};
	}
};
