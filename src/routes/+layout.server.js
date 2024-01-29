//Antes de cargar el componente lo que hago es obtener la cookie que he creado de el inicio de sesion
export const load = async ({ cookies }) => {
	const token = cookies.get('token');

	// se obtiene el usuario del token. aquí lo simulamos.
	const user = { name: 'pepe', id: 1 };

	return {
		username: token ? user.name : null
	};
};
