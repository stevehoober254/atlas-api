const EnlistProperty = require("../../../Models/EnlistProperty");

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

//admin
const getAllEnlistedProperties =async()=>{

    const allListedProperties =  await  EnlistProperty.find({})

    return allListedProperties;

}

//get total number of enlisted properties

const  countTotalEnlistedProperties=async ()=>{
    
   let count =await EnlistProperty.countDocuments({});

   return count;
}

// verify property
const verifyProperty = async(property_id)=>{

    try{
        const newPropertyUpdate = await  EnlistProperty.findByIdAndUpdate( property_id,{$set:{status:"verified"}},{new:true});
        return newPropertyUpdate;

    }catch(err){
        return null;

    }
}
// cancel verification property
const cancelPropertyVerification = async(property_id)=>{

    try{
        const newPropertyUpdate = await  EnlistProperty.findByIdAndUpdate( property_id,{$set:{status:"rejected"}},{new:true});
        return newPropertyUpdate;

    }catch(err){
        return null;

    }
}





module.exports ={
    userEnlistProperty,
    getAllEnlistedProperties,
    countTotalEnlistedProperties,
    verifyProperty,
    cancelPropertyVerification,
}
