const asyncHandler = require("express-async-handler")

const {handleUploads} = require("../../upload/uploadDocuments")

const uploadFile = async (req, res) => {
  try {
    // Extract base64 data from the uploaded file
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    
    // Create a dataURI from the base64 data
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    
    // Handle the upload using the provided service function
    const cldRes = await handleUploads(dataURI);
    
    // Send the response with the result from the upload service
    res.json(cldRes);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "An error occurred while uploading the file.",
      error: error.message,
    });
  }
};

module.exports = {
  uploadFile,
};
