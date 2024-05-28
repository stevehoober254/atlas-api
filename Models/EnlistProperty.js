const mongoose = require('mongoose');
const { Schema } = mongoose;

const enlistPropertySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    propertyImage: {
      type: String,
      required: true,
    },
    propertyTitleDeed: {
      type: String,
      required: true,
    },
    propertyCoordinate: {
      type: String,
      required: false,
    },
    userType: {
      type: String,
      required: false,
    },
    parcelNumber: {
      type: String,
      required: false,
    },
    ownerName: {
      type: String,
      required: true,
    },
    leaseType: {
      type: String, /** enum Freehold,     Leasehold,     Tenancy,      Sublease,      Occupancy,      Custom */
      required: false,
    },
    county: {
      type: String,
      required: false,
    },
    encumbrance: {
      type: String,
      required: true,
    },
    sizeHa: {
      type: String,
      required: true,
    },
    blockNumber: {
      type: String,
      required: false,
    },
    acquistionType: {
      type: String,  //enum leasehold
      required: false,
    },
    acquisitionDate: {
      type: String,  //change to date
      required: false,
    },
    titleLR: {
      type: String,
      unique: true,
      required: true,
    },
    propertyAlias: {
      type: String,
      unique: false,
      required: false,
    },
    propertyCoordinate: {
      type: String,
      required: false,
    },
    landRateBalance: {
      type: String,
      required: false,
    },
    registrationSection: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["waiting", "processing", "verified", "rejected"],
      default: "waiting",
    },
  },
  /**
   * fields ***
   * area,
   * location,
   * 
   * acquisitiondate
   * 
   */
  { timestamps: true }
);

module.exports = mongoose.models.EnlistProperty || mongoose.model("EnlistProperty", enlistPropertySchema);
