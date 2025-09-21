import express from 'express'
const app= express()
import User from '../../Database/models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {body,validationResult} from 'express-validator'

app.use(express.json())
const router = express.Router()
//Register
router.post('/register', 
    [
     body("firstName").notEmpty().withMessage("First name is required"),
     body("lastName").notEmpty().withMessage("Last name is required"),
     body("email").isEmail().withMessage("Enter a valid email"),
     body("password").isLength({min: 6}).withMessage("Password must be at least 6 characters")
    ],
    async(req,res)=>{
        const errors= validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
    try{
    const {firstName,lastName,email, password}= req.body

//Duplicate email check
        const existingUser= await User.findOne({
            where:{email}
        })
        if(existingUser){
            return res.status(400).json({message:"Email already exists"})
        }
//hashed password
    const salt= await bcrypt.genSalt(10)
    const hashedPassword= await bcrypt.hash(password,salt)

//user creation    
         await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword
        })
        return res.status(201).json({message:"User registered successfully"})

/*token creation
        const token= jwt.sign({id:user.id},process.env.JWT_SECRET,{
            expiresIn:process.env.JWT_EXPIRES
        })
        res.json({token,
            user:{
                id:user.id,
                firstName:user.firstName,
                lastName:user.lastName,
                email:user.email
            }
        })*/
    }
catch(err){
    console.error("Register error:", err.message);
   return res.status(500).json({ error: err.message });
}
})
//Login
router.post('/login',
    [
        body("email").isEmail().withMessage("Enter a valid email"),
        body("password").notEmpty().withMessage("Password is required")
    ],
    async(req,res)=>{
        const errors =validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
    const {email, password}= req.body
    try{
        //email verification
        const getEmail= await User.findOne({
            where:{email}
        })
        if(!getEmail){
            return res.status(401).json({message:"User not found"})
        }
        //password verification
        const passwordisValid=  await bcrypt.compare(password,getEmail.password)
        if(!passwordisValid){
           return res.status(401).json({message:"Invalid Password"})
        }
        console.log(getEmail)
        
        //token creation
        const token= jwt.sign({id:getEmail.id},process.env.JWT_SECRET,{
            expiresIn:process.env.JWT_EXPIRES
        })
       return res.status(201).json({token,
            user:{
                id:getEmail.id,
                firstName:getEmail.firstName,
                lastName:getEmail.lastName,
                email:getEmail.email
            }

        })
        
    }

    catch(err){
    console.error("Login error:", err.message);
   return res.status(500).json({ error: err.message });
}
})
export default router