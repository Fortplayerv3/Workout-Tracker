import jwt from "jsonwebtoken"

function middleware(req,res,next){
    const token = req.header('Authorization')
    if(!token){
        return res.sendStatus(401).json({message:"No token found, authorization denied"})
    }
    jwt.verify(token, process.env.JWT_SECRET, (err,decoded)=>{
        if(err){
            return res.status(401).json({message:"Invalid token"})
        }
        req.userId=decoded.id
        next()
    })
}
export default middleware