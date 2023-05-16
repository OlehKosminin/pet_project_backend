const { HttpError } = require("../helpers");

const { Notices } = require("../models/notices");
const { ctrlWrapper } = require("../utils");
const { save } = require("../services/ImageService");
const { json } = require("express");

const createNotice = async (req, res) => {
  const { file } = req;
  if (!file) throw HttpError(404, "The image was not uploaded");
  const imageUrl = await save(req.file, { width: 400, height: 300 });

  res.status(200, json({ imgUrl: imageUrl }));
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
