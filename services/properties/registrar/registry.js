const EnlistProperty = require("../../../Models/EnlistProperty");


//registrar
const getAllRegistryEnlistedProperties =async()=>{
   /**uncomment when push to production */
   // const allListedProperties =  await  EnlistProperty.find({status:{$ne:"waiting"}})
    const allListedProperties =  await  EnlistProperty.find({})

    return allListedProperties;

}





module.exports ={
   
    getAllRegistryEnlistedProperties
}