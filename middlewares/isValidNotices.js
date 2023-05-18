const { HttpError } = require("../helpers");
const { noticesCreateValidator } = require("../models/notices");
const { cloudinary } = require("../services/ImageService");

const isValidPostNotices = (req, res, next) => {
  const { error } = noticesCreateValidator(req.body);

  if (error && req.file) {
    cloudinary.uploader.destroy(req.file.filename, (error, result) => {
      if (error) {
        console.error(
          "Error deleted the photo into Cloudinary:",
          error.message
        );
      } else {
        console.log("The photo successful deleted into Cloudinary:", result);
      }
    });

    next(HttpError(400, `${error}`));
  }

  next();
};

module.exports = { isValidPostNotices };
