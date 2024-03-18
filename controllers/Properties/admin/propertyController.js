const asyncHandler = require("express-async-handler")
const {getUserbyPhoneNumber} = require("../../../services/user/userServices")
const {userEnlistProperty,getAllEnlistedProperties} = require("../../../services/properties/admin/enlistPropertyServices")
const {getAllRegistryEnlistedProperties} = require("../../../services/properties/registrar/registry")
const {handleUploads,uploadImage}= require("../../../upload/uploadDocuments")
const {convertBase64} = require("../../../hooks/fileupload")
const {getAllPropertyTransfered,getTotalTransfers} = require("../../../services/transfersProperty/admin/transfers")



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


//get All Transfered Properties

const getTransfers = asyncHandler(async(req,res)=>{
    try{
        const transferProperty = await  getAllPropertyTransfered();
        

        if(!transferProperty || transferProperty.length ==0){
            return res.status(401).json({message:"no property yet "})
        }
        return res.status(200).json(transferProperty);


    }catch(error){
        return res.status(500).json({message:"try another time "})

    }
})




module.exports ={
   
    getAllPropertiesEnlisted,
    getTransfers
    
}