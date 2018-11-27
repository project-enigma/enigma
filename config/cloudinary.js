// config/ cloudinary.js
require('dotenv').config();
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'folder-name', // The name of the folder in cloudinary
  allowedFormats: ['jpg', 'png'],
  filename(req, file, cb) {
    cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
  },
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
