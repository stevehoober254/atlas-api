const {cloudinary} = require("../config/cloudinary")
const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

const uploadImage = (image) => {
  //imgage = > base64
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, opts, (error, result) => {
      if (result && result.secure_url) {
        console.log(result.secure_url);
        return resolve(result.secure_url);
      }
      console.log(error.message);
      return reject({ message: error.message });
    });
  });
};


const uploadMultipleImages = (images) => {
  return new Promise((resolve, reject) => {
    const uploads = images.map((base) => uploadImage(base));
    Promise.all(uploads)
      .then((values) => resolve(values))
      .catch((err) => reject(err));
  });
};

const handleUploads = async(file)=>{
  try{
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    return result;
  }catch(err){
    console.log("error upload",err)

  }
    


}

module.exports = {handleUploads,uploadImage,uploadMultipleImages}