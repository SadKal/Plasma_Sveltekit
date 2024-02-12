//Aqui lo que hago es que le digp que hacer con los action de los formuklarios, en el caso en el que sea login que haga una cosa y si es logout otra.
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	async login({ request, cookies }) {
		const form = await request.formData();
		const username = form.get('username');
		const password = form.get('password');
		const response = await fetch("http://localhost:4000/users");//Hago un fetch para poder meterme en el json
		const users = await response.json();//Y le digo que se trata de un json
		console.log(users);
		
		if (!username) {
			return fail(400, { usernameMissing: true }); //El passwordMissing es de el page.svelte lo que hago es que si esta mal me muestra un parrafo rojo.
		}
		if (!password) {
			return fail(400, { passwordMissing: true });
		}

		const userFound = users.find(user => user.username === username);
	
		if (userFound) {
			cookies.set('token', username, { path: '/' });
			return { status: 200 };
		}

		return fail(400, { userNotFound: true });
		
	},
	logout: ({ cookies, url }) => {
		cookies.delete('token', { path: '/' });
		throw redirect(303, url.searchParams.get('redirectTo') || '/');
	}
};