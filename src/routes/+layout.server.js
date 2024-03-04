import { verifyToken } from "$lib/utils/jwt";
//Antes de cargar el componente lo que hago es obtener la cookie que he creado de el inicio de sesion
export const load = async ({ cookies }) => {
	const token = cookies.get('token');
	if (token) {
		const decodeToken = verifyToken(token);
		if (decodeToken) {
			const userToken = decodeToken;
			const responseUser = await fetch(`http://localhost:4000/users/${userToken.id}`);
			const user = await responseUser.json();

			return user;
		}
	}
};
