import Crypto from '../helper/encryption.js'
import Admin from '../models/admin.model.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config()


const crypto = new Crypto(process.env.DECRYPT_KEY);

const checkPassword = async (pass, pass1) => {
    try {
        let decryptPass = crypto.decrypt(pass1)
        if (decryptPass === pass) {
            return true
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

const checkAutorized = async (token,adminId) => {

    if (!token) return ({ message: 'No token provided',success:false });
    if (!token.startsWith('Bearer')) {
        return ({ message: 'Token not start with Bearer' , success:false});
    } else {
        token = token.substring(7, token.length);
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY,(err)=>{
       if(err){
        return false
       }else{
        return true
       }
    });
    if(!decoded){
        return { message: 'Invalid Token' , success:false}
    }

    let decode = jwt.decode(token, { complete: true });
    const currentTime = Math.floor(Date.now() / 1000);
    if (currentTime > decode.payload.exp) {
        return ({ success: false, message: `Token Expired` });
    }

    if(adminId !== decode.payload.adminId){
        return ({ success: false, message: `Unauthorized` });
    }
    
    return ({ success: true, message: `Authorized` });

    


}
export { checkPassword, checkAutorized }