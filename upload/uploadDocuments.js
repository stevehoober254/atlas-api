const {cloudinary} = require("../config/cloudinary")



const handleUploads = async(file)=>{
    const result = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
      });
      return result;


}

module.exports = {handleUploads}