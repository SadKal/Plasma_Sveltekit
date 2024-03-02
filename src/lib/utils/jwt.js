import jwt from "jsonwebtoken";

const secretKey = "123456";

export function signToken(payload){
    const token = jwt.sign(payload,secretKey,{expiresIn: '1h'});
    return token;
}

export function verifyToken (token){
    try {
        const decode = jwt.verify(token,secretKey);
        return decode;

    } catch (error) {
        console.error('Error al verificar el token:', error.message);
        return null;
    }
}