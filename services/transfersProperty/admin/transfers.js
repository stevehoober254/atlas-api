const Transfer =require("../../../Models/Transfer")


//get all transfered properties

const getAllPropertyTransfered = async()=>{
    const  propertyTransfers=await Transfer.find({})
     return propertyTransfers;
}

module.exports= {getAllPropertyTransfered}