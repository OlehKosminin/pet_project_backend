const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { petId } = req.params;
  if (!isValidObjectId(petId)) {
    next(HttpError(404, `${petId} invalid format`));
  }
  next();
};

module.exports = isValidId;
