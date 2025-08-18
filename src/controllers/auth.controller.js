import bcrypt from "express"
import jwt from "jsonwebtoken"
import prisma from "../prismaClient.js";
export const register=async (req,res)=>{
    try {
        const {name,email,password}=req.body;
        const hashed=await bcrypt.hash(password,10)

        const user=await prisma.user.create({
            data:{
                name,
                email,
                password:hashed
            }
        })
        res.json({
            msg:"user created successfully",
            user
        })
    } catch (error) {
        res.json({
            error:error
        })
    }
}


export const login=async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await prisma.user.findUnique({
            where:{email}
        })
        if(!user){
            res.json({
                msg:"user not found"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            res.json({
                msg:"incorrect password"
            })
        }
        const token=jwt.sign({id:user.id},process.env.JWT_SECRET)

        res.cookie("token",token,{
            httpsOnly:true,
            sameSite:"strict",
            maxAge:24*60*60*1000,
        })
        res.json({
            msg:"login successfully"
        })
    } catch (error) {
        res.json({
            msg:error
        })
    }
}


