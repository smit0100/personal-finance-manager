const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const serverConfig = require('./serverConfig');


cloudinary.config({
    cloud_name: serverConfig.CLOUD_NAME,
    api_key: serverConfig.CLOUD_API_KEY,
    api_secret: serverConfig.CLOUD_API_SECRET,
    secure: true
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',
        format: async (req, file) => 'png', 
        public_id: (req, file) => `${Date.now()}_${file.originalname}`,
    },
});

const parser = multer({ storage: storage });

module.exports = parser;