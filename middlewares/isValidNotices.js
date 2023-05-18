const { HttpError } = require("../helpers");
const { noticesCreateValidator } = require("../models/notices");
const { cloudinary } = require("../services/ImageService");

const isValidPostNotices = (req, res, next) => {
  const { error } = noticesCreateValidator(req.body);

  if (error && req.file) {
    cloudinary.uploader.destroy(req.file.filename, (error, result) => {
      if (error) {
        console.error(
          "Помилка під час видалення фото з Cloudinary:",
          error.message
        );
      } else {
        console.log("Фото успішно видалено з Cloudinary:", result);
      }
    });

    next(HttpError(400, `${error}`));
  }

  next();
};

module.exports = { isValidPostNotices };
