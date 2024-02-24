const asyncHandler = require("express-async-handler")
const {getUserbyPhoneNumber} = require("../../services/userServices")
const {userEnlistProperty} = require("../../services/userEnlistPropertyServices")

const enlistProperty = asyncHandler(async(req,res)=>{
    const {phoneNumber,
        propertyImage,
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


module.exports ={
    enlistProperty
}