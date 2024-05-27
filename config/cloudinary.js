const cloudinary = require('cloudinary').v2;


cloudinary.config({
  cloud_name: 'dgrajdspl',
  api_key: '226587827923298',
  api_secret: 'maApFYpTdEArXco837zLvV19Drw',
});
module.exports = {cloudinary}