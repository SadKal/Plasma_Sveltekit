
//Antes de cargar el componente lo que hago es obtener la cookie que he creado de el inicio de sesion
export const load = async ({ cookies }) => {
	const token = cookies.get('token');
	const response = await fetch("http://localhost:5173/users");//Hago un fetch para poder meterme en el json
	const users = await response.json();//Y le digo que se trata de un json

	const user = users.find(user => user.username === token);

	return {
		username: token ? user.name : null
	};
};
