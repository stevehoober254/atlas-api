const mongoose = require('mongoose');
const {Schema} = mongoose;
 const userSchema = new Schema(
    {
        email:{
            type:String,
            unique:true,
            required:false,
        },
        
        password:{
            type:String,
            required: false,
        },
        role: {
            type: String,
            enum: ["public", "owner", "government", "registry"],
            default: "public",
          },
          phoneNumber:{
            type:String,
            unique:true,
            required:true
        },
          fullName:{
            type:String,
            unique:false,
            required:false,
        },
        // userProfile: {
        //     type: Schema.Types.ObjectId,
        //     ref: "Profile",
        //     required: false,
        //   },

    },
    {timestamps:true}
 );
  module.exports = mongoose.models.User || mongoose.model("User",userSchema);