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
  params: (req) => ({
    folder: `notices-img/${req.user.id}`,
    format: "webp",
    public_id: uuid(),
    transformation: [{ width: 400, height: 300, crop: "fill" }],
    overwrite: true,
    quality: 85,
  }),
});

const upload = multer({ storage: cloudinaryStorage });

class ImageService {
  static upload(name) {
    return upload.single(name);
  }

  static async save(file) {
    // Завантажуємо зображення до Cloudinary
    const result = await cloudinary.uploader.upload(file.path);
    return result.secure_url;
  }
}

module.exports = { ImageService, cloudinary };
