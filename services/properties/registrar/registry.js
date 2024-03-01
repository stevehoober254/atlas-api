const EnlistProperty = require("../../../Models/EnlistProperty");


//registrar
const getAllEnlistedProperties =async()=>{

    const allListedProperties =  await  EnlistProperty.find({})

    return allListedProperties;

}





module.exports ={
   
    getAllEnlistedProperties
}