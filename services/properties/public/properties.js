const EnlistProperty = require("../../../Models/EnlistProperty");

//public
const getAllUserEnlistedProperties = async (user_id) => {
    
    try {
        const allUserListedProperties = await EnlistProperty.find({ user: user_id }).exec();
        return allUserListedProperties;
    } catch (error) {
       
        return error;
    }
};


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
    verifyPropertyForProcessing
};
