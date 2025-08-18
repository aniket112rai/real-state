import jwt from "jsonwebtoken"

export const authMiddleware=(req,res,next)=>{
    try {
        const token=req.cookies?.token

        if(!token) res.json({msg:"user is not authorized"})

        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded
    next(); 
    } catch (error) {
        res.json({
            msg:error
        })
    }   
}