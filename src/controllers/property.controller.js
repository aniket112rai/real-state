import prisma from "../prismaClient";

export const createProperty=async (req,res)=>{
    try {
        const {title,description,price,location,imageUrl}=req.body
        const property=await prisma.property.create({
            title,
            description,
            price,
            location,
            imageUrl,
            ownerId:req.user.id
        })
        res.json(property)
    } catch (error) {
        res.json({
            msg:"something went wrong in property controller"
        })
    }
}


export const getProperty=async(req,res)=>{
    try {
        const property=await prisma.property.findMany({
            include: { 
                owner: {
                    select:{
                        id:true,
                        name:true,
                        email:true
                    }
                }
            },
        })
    
        res.json(property);
        
    } catch (error) {
        res.json({
            msg:error
        })
    }
}

export const getOneProperty=async (req,res)=>{
    
    try {
        const property=await prisma.property.findUnique({
            where:{
                id:parseInt(req.params.id)
            },
            include:{
                owner:true
            },
        })
        res.json(property)
        
    } catch (error) {
        res.json({
            msg:error
        })
    }
}


export const updateProperty=async (req,res)=>{
    
    try {
        const property=await prisma.property.findUnique({
            where:{
                id:parseInt(req.params.id)
            }
        })
        if(property.ownerId!=req.user.id){
            res.json({
                msg:"user not authorized"
            })
        }
        const updated= await prisma.property.update({
            where:{id:property.id},
            data:req.body
        })
        res.json(updated)
        
    } catch (error) {
        res.json({
            msg:error
        })
    }
}

export const deleteProperty=async(req,res)=>{
    
    try {
        const property=await prisma.property.findUnique({
            where:{
                id:parseInt(req.params.id)
            }
        })
        if(property.ownerId!=req.user.id){
            res.json({
                msg:"not authorized"
            })
        }
        await prisma.property.delete({
            where:{
                id:property.id
            }
        })
        res.json({
            msg:"property deleted"
        })
        
    } catch (error) {
        res.json({
            msg:error
        })
    }
}
