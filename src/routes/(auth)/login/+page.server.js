import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	async login({ request, cookies, url }) {//Lo que estoy haciendo es que de el action que me pasan del login miro la accion que llevo a cabo
		const form = await request.formData();
		const username = form.get('username');
		const password = form.get('password');

		if (!username) {
			return fail(400, { usernameMissing: true });
		}

		if (!password) {
			return fail(400, { passwordMissing: true, username });
		}

		cookies.set('token', 'token_value', { path: '/' });

		throw redirect(303, url.searchParams.get('redirectTo') || '/');
	},
	logout: ({ cookies, url }) => {//Y el logout que me borra la cookie.
		cookies.delete('token', { path: '/' });
		throw redirect(303, url.searchParams.get('redirectTo') || '/');
	}
};
