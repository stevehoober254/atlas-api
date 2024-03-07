const asyncHandler = require("express-async-handler")
const {getUserbyPhoneNumber,getUserById} = require("../../../services/user/userServices")
const {userEnlistProperty,getAllEnlistedProperties} = require("../../../services/properties/admin/enlistPropertyServices")
const {getAllRegistryEnlistedProperties,getEnlistedPropertyPerCounty,verifyProperty,rejectProperty} = require("../../../services/properties/registrar/registry")
const {handleUploads,uploadImage}= require("../../../upload/uploadDocuments")
const {convertBase64} = require("../../../hooks/fileupload")



const getAllRegistryPropertiesEnlisted = asyncHandler(async(req,res)=>{

    try{
        const allProperties = await getAllRegistryEnlistedProperties();

        if (!allProperties){
            return res.status(401).json("no property enlisted")
        }

        return res.status(201).json(allProperties)


    }catch(err){
        console.log(err)
        return res.status(401).json("Failed to fetch properties")

    }
})


const getAllPropertiesPerCounty = asyncHandler(async(req,res)=>{

    try{
        const registrar = await getUserById(req.user.id)
       

        if(!registrar){
            return  res.status(401).json({message:"user does not exists"})
        }

        const properties = await getEnlistedPropertyPerCounty(registrar.county)

        if(!properties || properties.length === 0){
            return  res.status(204).json({message:"no properties"})

        }
        return res.status(200).json(properties)




    }catch(error){
        return res.status(500).json({message:"error retriving properties"})

    }

})

//verify/Reject






module.exports ={
   
    getAllRegistryPropertiesEnlisted,
    getAllPropertiesPerCounty
}