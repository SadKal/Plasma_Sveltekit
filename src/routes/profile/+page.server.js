import { redirect } from '@sveltejs/kit';

export const load = async ({ parent, url }) => {
	
	const { username } = await parent();

	if (!username) {
		throw redirect(303 /*temporal redirect */, `/login?redirectTo=${url.pathname}`);//Le digo que me lleve a login
	}

};
