const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const sharp = require("sharp");
const uuid = require("uuid").v4;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => ({
    folder: `images/${req.user.id}`,
    format: "webp",
    public_id: (req, file) => uuid(),
    overwrite: true,
    quality: 85,
  }),
});

const upload = multer({ storage: cloudinaryStorage });

class ImageService {
  static upload(name) {
    return upload.single(name);
  }

  static async save(file, options, userId) {
    // Обрізаємо та зменшуємо розмір зображення
    const imageBuffer = await sharp(file.buffer)
      .resize(options || { height: 500, width: 500 })
      .toFormat("webp")
      .toBuffer();

    // Завантажуємо зображення до Cloudinary
    const result = await cloudinary.uploader.upload(imageBuffer);
    return result.secure_url;
  }
}

module.exports = ImageService;
