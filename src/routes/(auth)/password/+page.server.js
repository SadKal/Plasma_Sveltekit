import { redirect } from '@sveltejs/kit';
import { signToken } from '$lib/utils/jwt.js';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();

		const formOldPassword = data.get('oldpassword');
		const formNewPassword = data.get('newpassword');
		const username = data.get('username');

		const response = await fetch('http://localhost:4000/users');
		const users = await response.json();

		const userFound = users.find((user) => user.username === username && user.password === formOldPassword);

		if (userFound) {
			const updatedUser = {
				...userFound, //Lo que hago es coger los valores del usuario y luego sobreescribo la contraseña.
				password: formNewPassword
			};

			const updateResponse = await fetch(`http://localhost:4000/users/${userFound.id}`, {
				//Lo que hago es que cojo el id del usuario que me han pasado y me meto en el json con ese id para poder cambiar la contraseña.
				method: 'PUT',
				body: JSON.stringify(updatedUser), //Paso el objeto a una cadena json
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (updateResponse.ok) {
				const token = signToken({ username });
				cookies.set('token', token, { path: '/' });
				throw redirect(302, '/');
			}
		} else {
			return {
				error: true,
				message: "No se ha encontrado un usuario con ese nombre y contraseña.",
				username
			};
		}
	}
};
