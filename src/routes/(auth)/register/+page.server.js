
import { redirect } from "@sveltejs/kit";

export const actions = {
    default: async ({ request, cookies}) =>{
        const data = await request.forData();

        const formName = data.get('nombre');
        const formLastname = data.get('apellido');
        const formEmail = data.get('email');
        const formPassword = data.get('password');
        const formUser = data.get('user');


        const response = await fetch("http://localhost:5173/users");
        const users = await response.json();

        const emailFound = users.find((user) => user.email === formEmail);
        const userFound = users.find((user) => user.user === formUser);

        if (!emailFound && !userFound) {
            const Insert = await fetch('http://localhost:5173/users',{
                method:'POST',
                body:JSON.stringify({
                    "name":formName,
                    "lastname":formLastname,
                    "email":formEmail,
                    "password":formPassword,
                    "user":formUser
                }), 
                headers:{
                    'Content-Type':'application/json' //Esto es para decirle que todo lo que he metido en json
                }
            });

            if (Insert.ok) {
                cookies.set('user',formUser,{path:'/'});
                throw redirect(302,'/');                
            }
        }else{
            mensajeError = "El usuario ya existe"
            if (emailFound) {
                mensajeError = "El email ya está en uso"
            }
        }
        return{
            error:true,
            message:meansajeError,
            formUser
        }
    }
};



