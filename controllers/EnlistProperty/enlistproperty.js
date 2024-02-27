const asyncHandler = require("express-async-handler")
const {getUserbyPhoneNumber} = require("../../services/userServices")
const {userEnlistProperty,getAllEnlistedProperties} = require("../../services/enlistPropertyServices")
const {handleUploads,uploadImage}= require("../../upload/uploadDocuments")
const {convertBase64} = require("../../hooks/fileupload")

const enlistProperty = asyncHandler(async(req,res)=>{
    const {phoneNumber,
        propertyImageBase64,
        landRefNumber,
        currentOwner,
        acquisitionDate,
        leaseType,
        countyOfDomicile,
        encumbrances,
        propertySize,
        blockNumber,
        acquisitionType,
        userType,
        adjudicationSection,
        landrateBalance
    } = req.body;
    
  const  propertyImage = await uploadImage(propertyImageBase64)
  console.log("prorr",propertyImage)

    try{
        const user =  await getUserbyPhoneNumber(phoneNumber);
        if(!user){
            return  res.status(401).json("user Does not exists")
        }
        const propertyDetails={
           
            propertyImage:propertyImage,
        landRefNumber:landRefNumber,
        currentOwner:currentOwner,
        acquisitionDate:acquisitionDate,
        leaseType:leaseType,
        countyOfDomicile:countyOfDomicile,
        encumbrances:encumbrances,
        propertySize:propertySize,
        blockNumber:blockNumber,
        acquisitionType:acquisitionType,
        userType:userType,
        adjudicationSection:adjudicationSection,
        landrateBalance:landrateBalance

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

        return res.status(201).json({data:allProperties})


    }catch(err){
        console.log(err)
        return res.status(401).json("Failed to fetch properties")

    }
})



module.exports ={
    enlistProperty,
    getAllPropertiesEnlisted
}