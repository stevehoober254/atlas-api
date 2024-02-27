const fs = require('fs');

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (error, data) => {
      if (error) {
        reject(error);
      } else {
        const base64String = Buffer.from(data).toString('base64');
        resolve(base64String);
      }
    });
  });
};


module.exports = {convertBase64}