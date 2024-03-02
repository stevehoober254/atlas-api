const asyncHandler = require("express-async-handler")


const {getAllUserEnlistedProperties} = require("../../services/properties/public/properties");

const {validateToken} = require("../../middleWare/validateTokenHandler")

const getAllUserProperty = asyncHandler(async(req,res)=>{
    

    try{
        const properties = await getAllUserEnlistedProperties(req.user.id);
        return res.status(201).json(properties);

    }catch(err){
        console.log("error",err)
      return   res.status(401).json({message:"Failed to fetch user property"})
    }


    





})


module.exports={
    getAllUserProperty
}