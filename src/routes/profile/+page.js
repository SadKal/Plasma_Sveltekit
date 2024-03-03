import { redirect } from '@sveltejs/kit';
export const load = async ({ parent, url }) => {
    const { username } = await parent();

    if (!username) {
        throw redirect(303, `/login?redirectTo=${url.pathname}`);
    }

    const response = await fetch("http://localhost:4000/users");//Hago un fetch para poder meterme en el json
    const users = await response.json();//Y le digo que se trata de un json

    const userFound = users.find(user => user.username === username);
    const { email } = userFound;

    return {
        username,
        email
    };
};