<<<<<<< HEAD

//Antes de cargar el componente lo que hago es obtener la cookie que he creado de el inicio de sesion
export const load = async ({ cookies }) => {
	const token = cookies.get('token');
	const response = await fetch("http://localhost:4000/users");//Hago un fetch para poder meterme en el json
	const users = await response.json();//Y le digo que se trata de un json
	let user = null;

	const userFound = users.find(user => user.username === token);

	if (userFound) {
		user = { name: token,id: 1 };
	}

	//AQUI VOY A MIRAR SI ESTOY AUTENTICADO O NO

	return {
        username: token ? (user ? user.name : null) : null
		};
};
=======
export async function load({ cookies }) {
    const response = await fetch('http://localhost:4000/users');
    const users = await response.json();

    const user = users.find(user => user.id === "1");

    cookies.set('user', user, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30
    });

    return user;
} 
>>>>>>> refs/remotes/origin/main
