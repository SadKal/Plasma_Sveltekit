
//Cargo algunos datos antes de que se renderize la pagina, ademas load puede exportar valores que conf el comportamiento de la pagina
import { redirect } from '@sveltejs/kit';

export const load = async ({ parent }) => {
	const { username } = await parent(); //Await es una promesa que representa el ressultado eventual.

	if (username) {
		throw redirect(303 /*temporal redirect */, '/');
	}
};
