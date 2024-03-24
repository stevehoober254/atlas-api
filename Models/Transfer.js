


const mongoose = require("mongoose")
const {Schema} = mongoose

const PropertyTransferSchema = new Schema(
    {
        userNationalId: {
            type: String,
            required: true,
          },      
      newuserNationalId: {
        type: String,
        required: true,
      },
      landReferenceNumber: {
        type: String,       
        required: true,
      },
      newOwnerEthereumAddress: {
        type: String,
        required: true,
      },
      requestorAddress: {
        type: String,
        required: false,
      },
      approvalDate: {
        type: String,
        required: false,
      },
      
      requestDate: {
        type: String, 
        required: false,
      },
     
      status: {
          type: String,
          enum: ['Requested', 'Approved', 'Encumbered', 'Error'],
          default: "Requested",
        },
        attachDocument: {
          type: String, 
          required: false,
        },
    },
   
    { timestamps: true }
  );
  
  module.exports = mongoose.models.PropertyTranfer|| mongoose.model("PropertyTranfer", PropertyTransferSchema);



