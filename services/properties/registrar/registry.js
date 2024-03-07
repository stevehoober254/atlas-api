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



module.exports ={
   
    getAllRegistryEnlistedProperties,
    getEnlistedPropertyPerCounty
}