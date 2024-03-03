const asyncHandler = require("express-async-handler")
const {getUserbyPhoneNumber} = require("../../../services/user/userServices")
const {userEnlistProperty,getAllEnlistedProperties} = require("../../../services/properties/admin/enlistPropertyServices")
const {getAllRegistryEnlistedProperties} = require("../../../services/properties/registrar/registry")
const {handleUploads,uploadImage}= require("../../../upload/uploadDocuments")
const {convertBase64} = require("../../../hooks/fileupload")



//view all enlisted property

const getAllPropertiesEnlisted = asyncHandler(async(req,res)=>{

    try{
        const allProperties = await getAllEnlistedProperties();

        if (!allProperties){
            return res.status(401).json("no property enlisted")
        }

        return res.status(201).json(allProperties)


    }catch(err){
        console.log(err)
        return res.status(401).json("Failed to fetch properties")

    }
})





module.exports ={
   
    getAllPropertiesEnlisted
    
}