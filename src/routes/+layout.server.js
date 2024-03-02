
import { verifyToken } from "../lib/utils/jwt";

//Antes de cargar el componente lo que hago es obtener la cookie que he creado de el inicio de sesion
export const load = async ({ cookies }) => {
	const token = cookies.get('token');
	console.log(token);
	if (token) {
		const decodeToken = verifyToken(token);
		
		if (decodeToken) {
			const { username} = decodeToken;	
			
				console.log("Usuario layout.server: "+ username);
				return{
					username
				};
		}
	}

	return {
        username: null,
        email: null
    };

};
