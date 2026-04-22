import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export default function authUser(req, res, next) {
    const header = req.header("Authorization")

    if (header != null) {
        const token = header.replace("Bearer ", "")

        console.log(token)
        jwt.verify(token, process.env.tokenSecret,
            (error, decoded) => {
               if(decoded==null){
                res.json({
                    message:"Invalid token.Please login again"
                })
               }else{
                req.user=decoded
                next()
               }
            }
        )
    }
    else {
        next()
    }

}