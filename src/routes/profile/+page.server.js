import { redirect } from '@sveltejs/kit';
import { verifyToken, signToken } from '../../lib/utils/jwt';

//Esto sirve para actualizar el nombre de usuario y el email.
const mensajeError = 'No ha salido bien';
export const actions = {
	updateUsername: async ({ request, cookies }) => {
		console.log('Usuario nuevo mandado');

		let username;

		const token = cookies.get('token');
		if (token) {
			const decodeToken = verifyToken(token);
			if (decodeToken) {
				username = decodeToken.username;
			}
		}
		const data = await request.formData(); //Cojo los datos del form
		const formUser = data.get('username'); //Cojo el nombre de usuaurio nuevo.
		console.log('FormUser:' + formUser);

		console.log('dentro de updateUsername');
		const response = await fetch('http://localhost:4000/users'); //Entro en el json donde tengo los usuarios
		const users = await response.json(); //Y le digo que me lo meta en una constante y que es json

		const userFound = users.find((user) => user.username === username); //Miro que el nombre de usuario nuevo no este en la base de datos. Si lo esta guardo sus datos en userFound
		console.log('Ha encontrado el usuario antiguo');

		if (userFound) {
			const updateUser = {
				...userFound,
				username: formUser // Actualiza específicamente el campo del nombre de usuario
			};

			const updateResponse = await fetch(`http://localhost:4000/users/${userFound.id}`, {
				method: 'PUT',
				body: JSON.stringify(updateUser),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (updateResponse.ok) {
				console.log('Se ha actualixado la base de datos');
				let username = formUser;
				const newToken = signToken({ username });
				cookies.set('token', newToken, { path: '/' });
				throw redirect(302, '/');
			}
		}

		return {
			error: true,
			message: mensajeError,
			formUser
		};
	},

	updateEmail: async ({ request, cookies }) => {
		const data = await request.formData();
		const formEmail = data.get('email');

		let username;

		const token = cookies.get('token');
		if (token) {
			const decodeToken = verifyToken(token);
			if (decodeToken) {
				username = decodeToken.username;
			}
		}

		const response = await fetch('http://localhost:4000/users');
		const users = await response.json();

		const userFound = users.find((user) => user.username === username); //Miro que el nombre de usuario nuevo no este en la base de datos. Si lo esta guardo sus datos en userFound

		if (userFound) {
			const updateUser = {
				...userFound,
				email: formEmail
			};

			const updateResponse = await fetch(`http://localhost:4000/users/${userFound.id}`, {
				method: 'PUT',
				body: JSON.stringify(updateUser),
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}

		return {
			error: true,
			message: mensajeError,
			formEmail
		};
	}
};

