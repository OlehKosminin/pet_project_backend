const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const uuid = require("uuid").v4;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => ({
    folder: `notices-img/${req.user.id}`,
    format: "webp",
    overwrite: true,
    quality: 85,
  }),
});

const upload = multer({ storage: cloudinaryStorage });

class ImageService {
  static upload(name) {
    return upload.single(name);
  }

  static async save(file, options) {
    // Завантажуємо зображення до Cloudinary
    const nameImg = uuid();
    const result = await cloudinary.uploader.upload(file.path, {
      public_id: nameImg,
      transformation: [{ width: 500, height: 500, crop: "fill", ...options }],
    });
    return result.secure_url;
  }
}

module.exports = ImageService;
