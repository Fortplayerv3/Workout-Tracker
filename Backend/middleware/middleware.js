import jwt from "jsonwebtoken"

function middleware(req,res,next){
    const authHeader = req.header('Authorization')
    if(!authHeader){
        return res.status(401).json({message:"No token found, authorization denied"})
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err,decoded)=>{
        if(err){
             console.error("JWT verification failed:", err.message);
            return res.status(401).json({message:"Invalid token"})
        }
        req.userId=decoded.id
        next()
    })
}
export default middleware