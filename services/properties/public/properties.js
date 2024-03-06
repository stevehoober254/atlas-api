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

//checkIfPropertyExists
const checkIfPropertyExists = async (titleLR) => {
    try {
        const property = await EnlistProperty.findOne({ titleLR: titleLR }).exec();
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

module.exports = {
    getAllUserEnlistedProperties,
    verifyPropertyForProcessing,
    checkIfPropertyExists,
    userEnlistProperty
};
