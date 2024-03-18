const Transfer =require("../../../Models/Transfer")


//get all transfered properties

const getAllPropertyTransfered = async()=>{
    const  propertyTransfers=await Transfer.find({})
     return propertyTransfers;
}

//get total sum of all properties transfered

const getTotalTransfers =async()=>{
    const total = await Transfer.find({}).countDocuments();
   return total
}

module.exports= {getAllPropertyTransfered,
getTotalTransfers}