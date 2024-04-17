const asyncHandler = require("express-async-handler")
const {getUserbyPhoneNumber, getUserById,getUserProfilebyId,getAllUser,getUserProfileByIdNumber,isProfileVerified} = require("../../../services/user/userServices")
const {getAllEnlistedProperties} = require("../../../services/properties/admin/enlistPropertyServices")
const {getAllRegistryEnlistedProperties} = require("../../../services/properties/registrar/registry")
const {handleUploads,uploadImage}= require("../../../upload/uploadDocuments")
const {convertBase64} = require("../../../hooks/fileupload")
const {getAllUserEnlistedProperties,verifyPropertyForProcessing,userEnlistProperty,checkIfPropertyExists,updatePropertyNewOwner,doesUserOwnProperty, isPropertyVerified,searchPropertyByTitleNumber,updateProperty,searchProperty} = require("../../../services/properties/public/properties");
const { transferProperty } = require("../../../services/properties/transfer/transfer")


// acquistionDate:item.acquistionDate,
// userType:item.userType,
// titleType:item.titleType,

const enlistProperty = asyncHandler(async (req, res) => {
    const {
        phoneNumber,
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
        propertyCoordinate,
        acquisitionDate,             
        userType
        
    } = req.body;

    const propertyImageURL = await uploadImage(propertyImage);
    const propertyTitleDeedURL = await uploadImage(propertyTitleDeed);

    try {
        const user = await getUserbyPhoneNumber(phoneNumber);
        if (!user) {
            return res.status(401).json({ message: "User does not exist" });
        }

        const propertyDetails = {
            titleLR: titleLR,
            county: county,
            registrationSection: registrationSection,
            blockNumber: blockNumber,
            parcelNumber: parcelNumber,
            sizeHa: sizeHa,
            ownerName: ownerName,
            leaseType: leaseType,
            acquistionType: acquistionType,
            encumbrance: encumbrance,
            landRateBalance: landRateBalance,
            propertyTitleDeed: propertyTitleDeedURL,
            propertyImage: propertyImageURL,
            propertyCoordinate:propertyCoordinate,
            userType:userType,
            acquisitionDate:acquisitionDate
        };

        const propertyExists = await checkIfPropertyExists(titleLR);
        if (propertyExists) {
            return res.status(409).json({ message: "Property already exists" });
        }

        const enlistedProperty = await userEnlistProperty(user._id, propertyDetails);
        return res.status(200).json({ message: "Property enlisted successfully", property: enlistedProperty });
    } catch (error) {
        console.error("Failed to enlist property", error);
        return res.status(500).json({ message: "Failed to enlist property" });
    }
});

const getAllUserProperty = asyncHandler(async(req,res)=>{
    
//get user id form jwt token
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


//transfer property

const transferPropertyOwnership = asyncHandler(async(req,res)=>{
    const {idNumber,landReferenceNumber,approvalDate,requestDate,attachDocument} = req.body;
try{

    //check if propery exists
    
    const propertyExists = await checkIfPropertyExists(landReferenceNumber);
    if (!propertyExists) {
        return res.status(401).json({ message: "Property does not exists" });
    }
    //check if user owns the property
    const ownProperty = await doesUserOwnProperty(landReferenceNumber,req.user.id);
    if (!ownProperty) {
        return res.status(401).json({ message: "You don't own this property" });
    }

    //check the status of the property if is verified
    const ispropertyVerified = await isPropertyVerified(landReferenceNumber,req.user.id);
    if (!ispropertyVerified) {
        return res.status(401).json({ message: "Property Not Verified" });
    }
    const user = await getUserById(req.user.id)
    //check if the user is authorized to
    if(!user){
        return res.status(401).json({message:"user not authorize to transfer"});
    }

    const userProfile = await getUserProfilebyId(req.user.id)

    if(!userProfile){
        return res.status(401).json({message:"user must complete their profile"});
    }
    
    //check if the sender profile is verified

    const profileVerified = await isProfileVerified(req.user.id)
    if(!profileVerified){
        return res.status(401).json({message:"profile need to be verify"});
    }


//get new racipient profile by id Number    
   const newUserProfile = await getUserProfileByIdNumber(idNumber)    
    if(!newUserProfile){
        return res.status(401).json({message:"The recipient need to complete their profile"});
    }
//check the recepient if profile is verified
    const recepientProfileVerified = await isProfileVerified(newUserProfile.user)
    if(!recepientProfileVerified){
        return res.status(401).json({message:`user ${newUserProfile.idNumber} need to verify profile`});
    }

    //get user profile name from user model
    const newUser = await getUserbyPhoneNumber(newUserProfile.phoneNumber);
    if(!newUser){
        return res.status(401).json({message:"The recipient of the property does not exists in the platform"});
    }

    //transfer the property and save it on the transfer model
    const attachDocumentURL = await uploadImage(attachDocument);
    const transfer = await transferProperty(userProfile.idNumber,newUserProfile.idNumber,landReferenceNumber,newUserProfile.ethereumAddress,userProfile.ethereumAddress,approvalDate,requestDate,attachDocumentURL);
    

    if(transfer){
        //change property ownership
        const changeOwnership = await updatePropertyNewOwner(propertyExists._id,newUser._id,newUser.currentOwner);
        
        if(!changeOwnership){
            return res.status(401).json({message:"Failed to change ownership"});

        }
        return res.status(200).json({message:"success"});
    }

}catch(error){
    return res.status(500).json({message:"Failed try another time"});

}

})

//search propertyby title number

const searchPropertyTitle = asyncHandler(async(req,res)=>{
    const {titleLR} = req.params
    try{
        const propertyTitle = await searchPropertyByTitleNumber(titleLR)

        if(!propertyTitle){
            return res.status(401).json({message:"property title Does not exists"})
        }

        return res.status(200).json(propertyTitle)



    }catch(error){
        return res.status(500).json({message:"Failed try another time"});

    }


})

//search for property by id -> requires billing

const searchForProperty = asyncHandler(async(req,res)=>{
    const {landReferenceNumber} = req.body();
    try{
        const user = getUserById(req.user.id);
        if(!user){
            res.status(401).json({message:"User need to create an account"})
        }
        const property = await searchProperty(landReferenceNumber);
        if(!property || property.lenghth ==0){
            res.status(401).json({message:"Property not Enlisted"})
        }
        res.status(200).json(property);

    }catch(error){
        return res.status(500).json({message:"Failed try another time"});

    }
})


//get all user profile

const getAllUsersIdNumber =asyncHandler(async(req,res)=>{
    try{
        const  userIds = await getAllUser();
        if(!userIds){
            return res.status(401).json({message:"no user  found"});
        }
        return res.status(200).json(userIds);

    }catch(error){
        return res.status(500).json({message:"Failed try another time"});

    }
})

// updateproperty controller
/**
 * the user must exists
 * the user must be owing the property
 */

const updatePropertySize =asyncHandler(async(req,res)=>{
const {property_id,sizeHa,landReferenceNumber} = req.body();

try{
    //check if propery exists
    
    const propertyExists = await checkIfPropertyExists(landReferenceNumber);
    if (!propertyExists) {
        return res.status(401).json({ message: "Property does not exists" });
    }

    //check if user owns the property
    const ownProperty = await doesUserOwnProperty(landReferenceNumber,req.user.id);
    if (!ownProperty) {
        return res.status(401).json({ message: "You don't own this property" });
    }
    //check if user exists
    const user = await getUserById(req.user.id)
    //check if the user is authorized to
    if(!user){
        return res.status(401).json({message:"user not authorize to transfer"});
    }
    //update the property size
    const propertyUpdate = await updateProperty(property_id,sizeHa);
    if(!propertyUpdate){
        return res.status(401).json({message:"Failed to update property"});
    }
    return res.status(200).json({message:"Property size updated successfully"});


}catch(error){
    return res.status(500).json({message:"Failed try another time"});


}


})

module.exports ={
    enlistProperty,
    getAllUserProperty,
    verifyForProcessing,
    transferPropertyOwnership,
    getAllUsersIdNumber,
    searchPropertyTitle,
    updatePropertySize,
    searchForProperty
    
}