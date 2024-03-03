const asyncHandler = require("express-async-handler")
const {getUserbyPhoneNumber} = require("../../../services/user/userServices")
const {userEnlistProperty,getAllEnlistedProperties} = require("../../../services/properties/admin/enlistPropertyServices")
const {getAllRegistryEnlistedProperties} = require("../../../services/properties/registrar/registry")
const {handleUploads,uploadImage}= require("../../../upload/uploadDocuments")
const {convertBase64} = require("../../../hooks/fileupload")
const {getAllUserEnlistedProperties,verifyPropertyForProcessing} = require("../../../services/properties/public/properties");

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




module.exports ={
    enlistProperty,
    getAllUserProperty,
    verifyForProcessing
    
}