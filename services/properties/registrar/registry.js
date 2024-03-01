const EnlistProperty = require("../../../Models/EnlistProperty");


//registrar
const getAllRegistryEnlistedProperties =async()=>{

    const allListedProperties =  await  EnlistProperty.find({})

    return allListedProperties;

}





module.exports ={
   
    getAllRegistryEnlistedProperties
}