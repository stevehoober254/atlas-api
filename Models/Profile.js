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
    },
    fullName: {
      type: String,
      required: false,
    },
    entity: {
      type: String,
      required: false,
    },
    identification: {
      type: String,
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
    email: {
      type: String,
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
