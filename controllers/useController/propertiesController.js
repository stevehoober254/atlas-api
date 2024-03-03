const asyncHandler = require("express-async-handler")


const {getAllUserEnlistedProperties,verifyPropertyForProcessing} = require("../../services/properties/public/properties");

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

//verify proprty to processing


const verifyForProcessing = asyncHandler(async(req,res)=>{
 const {property_id} = req.body;

 const updatePropertyStatus = await verifyPropertyForProcessing(property_id)
 if(!updatePropertyStatus){
    res.status(401).json("Failed to verify ")
 }

 res.status(200).json("Succeful verified");
    
})


module.exports={
    getAllUserProperty,
    verifyForProcessing
}