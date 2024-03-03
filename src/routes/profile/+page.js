import { redirect } from '@sveltejs/kit';
export const load = async ({ parent, url }) => {
    const { username } = await parent();

    if (!username) {
        throw redirect(303, `/login?redirectTo=${url.pathname}`);
    }

    return {
        username
    };
};