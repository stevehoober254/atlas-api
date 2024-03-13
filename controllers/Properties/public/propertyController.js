const asyncHandler = require("express-async-handler")
const {getUserbyPhoneNumber, getUserById,getUserProfilebyId} = require("../../../services/user/userServices")
const {getAllEnlistedProperties} = require("../../../services/properties/admin/enlistPropertyServices")
const {getAllRegistryEnlistedProperties} = require("../../../services/properties/registrar/registry")
const {handleUploads,uploadImage}= require("../../../upload/uploadDocuments")
const {convertBase64} = require("../../../hooks/fileupload")
const {getAllUserEnlistedProperties,verifyPropertyForProcessing,userEnlistProperty,checkIfPropertyExists,updatePropertyNewOwner} = require("../../../services/properties/public/properties");
const { transferProperty } = require("../../../services/properties/transfer/transfer")


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
    const {newuserPhoneNumber,landReferenceNumber,approvalDate,requestDate,property_id} = req.body;
try{
    
    const propertyExists = await checkIfPropertyExists(landReferenceNumber);
    if (!propertyExists) {
        return res.status(401).json({ message: "Property does not exists" });
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

    const newUser = await getUserbyPhoneNumber(newuserPhoneNumber);

    if(!newUser){
        return res.status(401).json({message:"The recipient of the property does not exists in the platform"});
    }

    const newUserProfile = await getUserProfilebyId(newUser._id)
    if(!newUser){
        return res.status(401).json({message:"The recipient need to complete their profile"});
    }

    const transfer = await transferProperty(userProfile.idNumber,newUserProfile.idNumber,landReferenceNumber,newUserProfile.ethereumAddress,userProfile.ethereumAddress,approvalDate,requestDate);

    if(transfer){
        const changeOwnership = await updatePropertyNewOwner(property_id,newUser._id);
        if(!changeOwnership){
            return res.status(401).json({message:"Failed to change ownership"});

        }
        return res.status(200).json({message:"success"});
    }









}catch(error){
    return res.status(500).json({message:"Failed try another time"});

}

})



module.exports ={
    enlistProperty,
    getAllUserProperty,
    verifyForProcessing,
    transferPropertyOwnership
    
}