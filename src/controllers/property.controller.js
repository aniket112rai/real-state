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
        const { title, description, price, location }=req.body
        const updated= await prisma.property.update({
            where:{id:property.id},
            data:{ title, description, price, location }
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

export const filtersProperty=async (req,res)=>{
    // All that code with filters, gte, lte, contains, etc. is written in the way Prisma understands queries.

    // Prisma doesn’t directly take raw SQL

    //Instead, Prisma expects a JavaScript object (query filter) that it can translate into SQL behind the scenes.
    try {
        const { location,minPrice,maxPrice }=req.query;
        const filters={};
        if(location){
            filters.location={
                contains:location,
                mode:"insensitive"
            }
        }
        if(minPrice || maxPrice){
            filters.price={};
            if(minPrice) filters.price.gte=parseFloat(minPrice)
            if(maxPrice) filters.price.lte=parseFloat(maxPrice)
        }
    
        const properties=await prisma.property.findMany({
            where:filters,
            include:{
                owner:true
            }
        })
        res.json(properties);
        
    } catch (error) {
        res.json({
            msg:`something went wrong in filter controller: ${error}`
        })
    }
}