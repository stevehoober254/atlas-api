// profile.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const profileSchema = new Schema(
  {
    // user: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: false,
    },
    idNumber: {
      type: String,
      required: true,
    },
    kraPin: {
      type: String,
      required: true,
    },
    // document
    identification: {
      //data: Buffer,
      type:String,
      
      required: false,
    },
    kraCertificate: {
      //data: Buffer,
      type:String,
      required: false,
    },
    ethereumAddress: {
      type: String,
      unique: true, // Set to true for uniqueness
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      
    },
    address: {
      type: String,
      required: false,
    },
    language: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Profile || mongoose.model("Profile", profileSchema);