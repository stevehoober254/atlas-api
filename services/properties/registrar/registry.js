const EnlistProperty = require("../../../Models/EnlistProperty");


//registrar
const getAllRegistryEnlistedProperties =async()=>{
   /**uncomment when push to production */
   // const allListedProperties =  await  EnlistProperty.find({status:{$ne:"waiting"}})
    const allListedProperties =  await  EnlistProperty.find({status:"processing"})

    return allListedProperties;

}

//get property per registrar county

const getEnlistedPropertyPerCounty = async(county)=>{
    
    const allPropertyPerCounty = await EnlistProperty.find({$and:[{county:county},{status:"processing"}]}).exec()

    return allPropertyPerCounty;

}

//verify or reject property verification

const verifyProperty = async(property_id)=>{

   
        const newPropertyUpdate = await  EnlistProperty.findByIdAndUpdate( property_id,{$set:{status:"verified"}},{new:true});
        return !!newPropertyUpdate;

  
    
}

const rejectProperty = async(property_id)=>{

    
        const newPropertyUpdate = await  EnlistProperty.findByIdAndUpdate( property_id,{$set:{status:"rejected"}},{new:true});
        return !!newPropertyUpdate;

   
    
   
    
}

module.exports ={
   
    getAllRegistryEnlistedProperties,
    getEnlistedPropertyPerCounty,
    verifyProperty,
    rejectProperty
}