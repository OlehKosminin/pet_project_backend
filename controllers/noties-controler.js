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

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const query = { owner };
  if (favorite) {
    query.favorite = favorite;
  }
  const result = await Notices.find(query, "", {
    skip,
    limit,
  }).populate("owner", "email");
  res.json(result);
};
module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  createNotice: ctrlWrapper(createNotice),
};
