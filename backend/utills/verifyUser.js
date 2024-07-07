import jwt from "jsonwebtoken"
const verifyToken=(req,res,next)=>{
    try {
        const token=req.cookies.token || req.headers.token
        if(!token){
            return res.status(401).json("Unauthorized access")
        }
        const x=jwt.verify(token,"Sk Nazibul Hossain")
        if(!x){
            return next(x)
        }
        req.user=x
        next()
    } catch (error) {
        next(error)
    }
}

export {verifyToken}