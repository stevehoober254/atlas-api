const mongoose = require('mongoose');
const { Schema } = mongoose;

const profileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true // Ensures each user has only one profile
    },
    // gender: {
    //   type: String,
    //   enum: ["male", "female", "other"],
    //   required: true,
    // },
    // dateOfBirth: {
    //   type: Date,
    //   required: false,
    // },
    idNumber: {
      type: String,
      unique:true,
      required: true,
    },
    fullName: {
      type: String,
      required: false,
    },
    identification: {
      type: String,
      required: false,
    },
    // kraCertificate: {
    //   type: String,
    //   required: false,
    // },
    ethereumAddress: {
      type: String,                       
      required: true,
    },   //make true in production
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["waiting","verified", "rejected"],
      default: "waiting",
    },
    // language: {
    //   type: String,
    //   required: false,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Profile || mongoose.model("Profile", profileSchema);
