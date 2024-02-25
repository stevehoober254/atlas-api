const {cloudinary} = require("../config/cloudinary")



const uploadLandTitle = async(image)=>{
    const result = await cloudinary.uploader.upload(image);

    return result;


}

module.exports = {uploadLandTitle}