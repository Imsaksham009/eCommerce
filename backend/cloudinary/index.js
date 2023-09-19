const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// const dotenv = require("dotenv");

// dotenv.config({ path: "backend/config/config.env" });

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
});

const avatarStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'avatars',
        allowedFormats: ["jpg", "jpeg", "png"],
        width: 150,
        crop: "scale"
    },
});

const productsStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'products',
        allowedFormats: ["jpg", "jpeg", "png"],
        crop: "scale"

    }
});

module.exports = { cloudinary, avatarStorage, productsStorage };
