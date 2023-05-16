// const path = require("path");
// const fse = require("fs-extra");
const sharp = require("sharp");
const multer = require("multer");
// const uuid = require("uuid").v4;

class ImageService {
  static upload(name) {
    const multerStorage = multer.memoryStorage();

    const multerFilter = (req, file, callBackFunc) => {
      if (file.mimetype.startsWith("image")) {
        callBackFunc(null, true);
      } else {
        callBackFunc(new Error(400, "Please upload images only.."), false);
      }
    };

    return multer({
      storage: multerStorage,
      fileFilter: multerFilter,
    }).single(name);
  }

  static async save(file, options, ...pathSegments) {
    return await sharp(file.buffer)
      .resize(options || { height: 288, width: 288 })
      .toFormat("webp")
      .webp({ quality: 85 });
  }
}

module.exports = ImageService;
