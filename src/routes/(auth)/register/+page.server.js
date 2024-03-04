import { redirect } from '@sveltejs/kit';
import { signToken } from '$lib/utils/jwt.js';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();

		const formEmail = data.get('email');
		const formPassword = data.get('password');
		const formUser = data.get('user');

		const response = await fetch('http://localhost:4000/users');
		const users = await response.json();

		const userFound = users.find(
			(user) =>
				typeof user.username === 'string' &&
				user.username.trim().toLowerCase() === formUser.trim().toLowerCase()
		);
		const emailFound = users.find(
			(user) =>
				typeof user.email === 'string' &&
				user.email.trim().toLowerCase() === formEmail.trim().toLowerCase()
		);

		let mensajeError = 'Error';

		if (!userFound && !emailFound) {
			let newId;

			// Obtener el ID más alto y sumarle uno
			const highestId = Math.max(...users.map((user) => user.id), 0); // (map)Convierto la lista de usuarios en un array que solo tenga id, luego con Math.max cojo el valor de los id mas alto
			newId = highestId + 1; //Y luego le sumo uno.

			const Insert = await fetch('http://localhost:4000/users', {
				method: 'POST',
				body: JSON.stringify({
					id: newId,
					username: formUser,
					password: formPassword,
					email: formEmail,
					games: []
				}),
				headers: {
					'Content-Type': 'application/json' //Esto es para decirle que todo lo que he metido en json
				}
			});

			if (Insert.ok) {
				//Si la insrccion a ido bien
				const token = signToken(Insert);
				cookies.set('token', token, { path: '/' });
				throw redirect(302, '/');
			}
		} else {
			mensajeError = 'El usuario ya existe';
			if (emailFound) {
				mensajeError = 'El email ya está en uso';
			}
		}
		return {
			error: true,
			message: mensajeError,
			formUser
		};
	}
};
