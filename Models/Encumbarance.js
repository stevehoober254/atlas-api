




const mongoose = require("mongoose")
const {Schema} = mongoose

const EncumbranceSchema = new Schema(
    {
      user: {
        type: Schema.Types.ObjectId,  //ref owner of the property
        ref: "User",
        required: true,
      },
      
      landReferenceNumber: {
        type: String,
        unique:true,
        required: true,
      },
      date: {
         type: Date,
          default: Date.now },
      encumbrances: {
        type: String,
        required: false,
      },

      status: {
          type: String,
          enum: ['Added', 'Removed'],
          default: "Added",
        },
    },


   
    { timestamps: true }
  );
  
  module.exports = mongoose.models.Encumbrance|| mongoose.model("Encumbrance", EncumbranceSchema);



