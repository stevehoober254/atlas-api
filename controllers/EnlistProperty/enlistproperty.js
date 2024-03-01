const asyncHandler = require("express-async-handler")
const {getUserbyPhoneNumber} = require("../../services/user/userServices")
const {userEnlistProperty,getAllEnlistedProperties} = require("../../services/properties/admin/enlistPropertyServices")
const {getAllRegistryEnlistedProperties} = require("../../services/properties/registrar/registry")
const {handleUploads,uploadImage}= require("../../upload/uploadDocuments")
const {convertBase64} = require("../../hooks/fileupload")

const enlistProperty = asyncHandler(async(req,res)=>{
    const {phoneNumber,
        titleLR,
         county,
         registrationSection,
         blockNumber,
         parcelNumber,
         sizeHa,
         ownerName,
         leaseType,
         acquistionType,
         encumbrance,
         landRateBalance,
         propertyTitleDeed,
         propertyImage,
    } = req.body;
    
  const  propertyImageURL= await uploadImage(propertyImage)
  const  propertyTitleDeedURL = await uploadImage(propertyTitleDeed)
  console.log("prorr",propertyImage)

    try{
        const user =  await getUserbyPhoneNumber(phoneNumber);
        if(!user){
            return  res.status(401).json("user Does not exists")
        }
        // phoneNumber:phoneNumber,
        // titleLR:titleLR,
        //  county:county,
        //  registrationSection:registrationSection,
        //  blockNumber:blockNumber,
        //  parcelNumber:parcelNumber,
        //  sizeHa:sizeHa,
        //  ownerName:ownerName,
        //  leaseType:leaseType,
        //  acquistionType:acquistionType,
        //  encumbrance:encumbrance,
        //  landRateBalance:landRateBalance,
        //  propertyTitleDeed:propertyTitleDeed,
        //  propertyImage:propertyImage
        const propertyDetails={
           
            titleLR:titleLR,
             county:county,
             registrationSection:registrationSection,
             blockNumber:blockNumber,
             parcelNumber:parcelNumber,
             sizeHa:sizeHa,
             ownerName:ownerName,
             leaseType:leaseType,
             acquistionType:acquistionType,
             encumbrance:encumbrance,
             landRateBalance:landRateBalance,
             propertyTitleDeed:propertyTitleDeedURL,
             propertyImage:propertyImageURL,

        }

      await   userEnlistProperty(user._id, propertyDetails)
    .then(enlistedProperty => {
        console.log("Enlisted property:", enlistedProperty);
        return res.status(201).json("Property  enlisted Successful")
    })
    .catch(error => {
        console.error("Error enlisting property:", error);
        return res.status(401).json("Failed to EnlistProperty");
    });


    }catch(err){

    }



})

//view all enlisted property

const getAllPropertiesEnlisted = asyncHandler(async(req,res)=>{

    try{
        const allProperties = await getAllEnlistedProperties();

        if (!allProperties){
            return res.status(401).json("no property enlisted")
        }

        return res.status(201).json({allProperties})


    }catch(err){
        console.log(err)
        return res.status(401).json("Failed to fetch properties")

    }
})


const getAllRegistryPropertiesEnlisted = asyncHandler(async(req,res)=>{

    try{
        const allProperties = await getAllRegistryEnlistedProperties();

        if (!allProperties){
            return res.status(401).json("no property enlisted")
        }

        return res.status(201).json({allProperties})


    }catch(err){
        console.log(err)
        return res.status(401).json("Failed to fetch properties")

    }
})



module.exports ={
    enlistProperty,
    getAllPropertiesEnlisted,
    getAllRegistryPropertiesEnlisted
}