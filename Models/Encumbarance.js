/** linked to user,property
 * Models *****
 * fields ****
 * Dispute
 * 
 */






const mongoose = require("mongoose")
const {Schema} = mongoose

const PropertyTransferSchema = new Schema(
    {
      user: {
        type: Schema.Types.ObjectId,  //ref owner of the property
        ref: "User",
        required: true,
      },
      property: {
        type: Schema.Types.ObjectId,   //ref to the property that is being transferd
        ref: "EnlistProperty",
        required: true,
      },
      landReferenceNumber: {
        type: String,
        unique:true,
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
        type: Date,
        required: true,
      },
      
      requestDate: {
        type: Date, 
        required: false,
      },
     
      status: {
          type: String,
          enum: ['Requested', 'Approved', 'Encumbered', 'Error'],
          default: "Requested",
        },
    },
   
    { timestamps: true }
  );
  
  module.exports = mongoose.models.PropertyTranfer|| mongoose.model("PropertyTranfer", PropertyTransferSchema);



