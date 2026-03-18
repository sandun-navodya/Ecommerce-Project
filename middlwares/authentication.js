import jwt from "jsonwebtoken";

export default function authUser(req, res, next) {
    const header = req.header("Authorization")

    if (header != null) {
        const token = header.replace("Bearer ", "")

        console.log(token)
        jwt.verify(token, "computer-01-store",
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