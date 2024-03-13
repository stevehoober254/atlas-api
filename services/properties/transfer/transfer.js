const Transfer = require("../../../Models/Transfer");





const transferProperty= async(userNationalId,newuserNationalId,landReferenceNumber,newOwnerEthereumAddress,requestorAddress,approvalDate,requestDate)=>{

    const trans = new Transfer({
        userNationalId:userNationalId,
        landReferenceNumber:landReferenceNumber,
        newOwnerEthereumAddress:newOwnerEthereumAddress,
        requestorAddress:requestorAddress,
        approvalDate:approvalDate,
        requestDate:requestDate,
        
        newuserNationalId:newuserNationalId,
      });
      const result = await trans.save()
      return !!result;
}

module.exports={
    transferProperty
}