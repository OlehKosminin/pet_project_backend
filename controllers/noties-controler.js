const { HttpError } = require("../helpers");

const { ctrlWrapper } = require("../utils");
const { save } = require("../services/ImageService");
const Notices = require("../models/notices");

const createNotice = async (req, res) => {
  const { file } = req;
  if (!file) throw HttpError(404, "The image was not uploaded");
  const imageUrl = await save(req.file, { height: 300, width: 400 });

  console.log(req.body);
  console.log(imageUrl);

  const noticesNew = await Notices.create({
    photoUrl: imageUrl,
    ...req.body,
    owner: req.user,
  });

  res.status(200).json({ notice: noticesNew });
};

const getCategoryNotices = async (req, res) => {
  const { page = 1, limit = 12, category } = req.query;
  const skip = (page - 1) * limit;

  const result = await Notices.find(category)
    .skip(skip)
    .limit(limit)
    .toArray((err, results) => {
      if (err) return console.error("Помилка запиту до бази даних:", err);
    });

  res.status(200).json({ result });
};

module.exports = {
  getCategoryNotices: ctrlWrapper(getCategoryNotices),
  createNotice: ctrlWrapper(createNotice),
};
