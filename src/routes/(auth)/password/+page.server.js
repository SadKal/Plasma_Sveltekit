
import { redirect } from "@sveltejs/kit";

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();

		const formPassword = data.get('password');
		const formUser = data.get('username');

		const response = await fetch("http://localhost:4000/users");
		const users = await response.json();

		const userFound = users.find(user => user.username === formUser);

		if (userFound) {
			const updateUser = {
				...userFound,//Lo que hago es coger los valores del usuario y luego sobreescribo la contraseña.
				password: formPassword
			};

			const updateResponse = await fetch(`http://localhost:4000/users/${userFound.id}`, {//Lo que hago es que cojo el id del usuario que me han pasado y me meto en el json con ese id para poder cambiar la contraseña.
				method: 'PUT',
				body: JSON.stringify(updateUser),//Paso el objeto a una cadena json
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (updateResponse.ok) {
				const token = signToken({formUser});
				cookies.set('token', token, { path: '/' });
				throw redirect(302, '/');
			}
		}


		return {
			error: true,
			message: mensajeError,
			formUser
		}
	}
};



