const asyncHandler = require("express-async-handler")
const {getUserbyPhoneNumber} = require("../../../services/user/userServices")
const {getAllEnlistedProperties} = require("../../../services/properties/admin/enlistPropertyServices")
const {getAllRegistryEnlistedProperties} = require("../../../services/properties/registrar/registry")
const {handleUploads,uploadImage}= require("../../../upload/uploadDocuments")
const {convertBase64} = require("../../../hooks/fileupload")
const {getAllUserEnlistedProperties,verifyPropertyForProcessing,userEnlistProperty,checkIfPropertyExists} = require("../../../services/properties/public/properties");

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