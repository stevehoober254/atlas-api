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
    landRefNumber: {
      type: String,
      required: false,
    },
    currentOwner: {
      type: String,
      required: true,
    },
    acquisitionDate: {
      type: Date,
      required: true,
    },
    leaseType: {
      type: String,
      required: false,
    },
    countyOfDomicile: {
      type: String,
      required: false,
    },
    encumbrances: {
      type: String,
      required: true,
    },
    propertySize: {
      type: String,
      required: true,
    },
    blockNumber: {
      type: String,
      required: false,
    },
    acquisitionType: {
      type: String,
      required: false,
    },
    userType: {
      type: String,
      required: false,
    },
    adjudicationSection: {
      type: String,
      required: false,
    },
    landrateBalance: {
      type: String,
      required: false,
    },
    registrationSection: {
        type: String,
        required: false,
      },
    status: {
        type: String,
        enum: ["waiting","processing", "verified", "rejected"],
        default: "waiting",
      },
  },
  { timestamps: true }
);

module.exports = mongoose.models.EnlistProperty || mongoose.model("EnlistProperty", enlistPropertySchema);
