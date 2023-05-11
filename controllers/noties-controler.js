// const { HttpError } = require("../helpers");

const { Contact } = require("../models/pets");
const { ctrlWrapper } = require("../utils");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const query = { owner };
  if (favorite) {
    query.favorite = favorite;
  }
  const result = await Contact.find(query, "", {
    skip,
    limit,
  }).populate("owner", "email");
  res.json(result);
};
module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
};
