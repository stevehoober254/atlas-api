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
      unique:true,
      required: true,
    },
    kraPin: {
      type: String,
      required: true,
    },
    identification: {
      type: String,
      required: false,
    },
    kraCertificate: {
      type: String,
      required: false,
    },
    ethereumAddress: {
      type: String,
      unique: true,
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
