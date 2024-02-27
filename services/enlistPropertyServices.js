const EnlistProperty = require("../Models/EnlistProperty");

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

const getAllEnlistedProperties =async()=>{

    const allListedProperties =  await  EnlistProperty.find({})

    return allListedProperties;

}

module.exports ={
    userEnlistProperty,
    getAllEnlistedProperties
}