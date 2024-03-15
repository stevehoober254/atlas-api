const EnlistProperty = require("../../../Models/EnlistProperty");


//user enlistProperty

const userEnlistProperty = async (userId, propertyDetails) => {
    try {
        // Merge userId and propertyDetails into a single object
        const enlistData = {
            user: userId,
            ...propertyDetails
        };

        // Create an instance of EnlistProperty with the merged data
        const enlist = new EnlistProperty(enlistData);

        // Save the enlistment to the database
        const enlistedProperty = await enlist.save();
        return enlistedProperty;
    } catch (error) {
        // Handle error
        console.error("Error enlisting property:", error);
        throw error;
    }
};
//public
const getAllUserEnlistedProperties = async (user_id) => {
    
    try {
        const allUserListedProperties = await EnlistProperty.find({ user: user_id }).exec();
        return allUserListedProperties;
    } catch (error) {
       
        return error;
    }
};

//updatenewPropertyOwner
const updatePropertyNewOwner = async(property_id,newOwner_id,newOwner_Name)=>{
    const newOwnerUpdate = await  EnlistProperty.findByIdAndUpdate( property_id,{$set:{user:newOwner_id,ownerName:newOwner_Name}},{new:true});
    return !!newOwnerUpdate;
}

//checkIfPropertyExists
const checkIfPropertyExists = async (landRefNumber) => {
    try {
        const property = await EnlistProperty.findOne({ landRefNumber: landRefNumber }).exec();
        return !!property; // Convert to boolean (true if property exists, false otherwise)
    } catch (error) {
        console.error("Error checking property existence:", error);
        // throw error; // Re-throw the error for the caller to handle
    }
}


//verify property for processing

const verifyPropertyForProcessing = async(property_id)=>{

    try{
        const newPropertyUpdate = await  EnlistProperty.findByIdAndUpdate( property_id,{$set:{status:"processing"}},{new:true});
        return newPropertyUpdate;

    }catch(err){
        return null;

    }
    
   
    
}

//check if property is verified

const isPropertyVerified = async (landReferenceNumber) => {
    const property = await EnlistProperty.findOne({ landRefNumber: landReferenceNumber, status: "verified" }).exec();
    return !!property;
};

//check if  a user owns a particular property
const doesUserOwnProperty = async (landReferenceNumber,user_Id)=>{
    const  ownerShipStatus=await  EnlistProperty.findOne({landRefNumber: landReferenceNumber,user: user_Id}).exec();
    return !! ownerShipStatus;
}


module.exports = {
    getAllUserEnlistedProperties,
    verifyPropertyForProcessing,
    checkIfPropertyExists,
    userEnlistProperty,
    updatePropertyNewOwner,
    isPropertyVerified,
    doesUserOwnProperty
};
