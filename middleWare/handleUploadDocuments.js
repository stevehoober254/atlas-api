const { memoryStorage } = require("multer");
const multer = require("multer");

const storage = memoryStorage()
const upload = multer({ storage });

module.exports = { upload };
