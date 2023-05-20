const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "user-avatars",
    format: async (req, file) => {},
  },
  allowedFormats: ["jpg", "png", "webp"],
  filename: (req, file, cb) => {
    console.log("file: ", file);
    console.log("req: ", req);
    cb(null, file.originalname);
  },
});

const uploadCloudAvatars = multer({ storage });

module.exports = uploadCloudAvatars;
