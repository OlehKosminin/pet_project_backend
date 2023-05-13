// const { HttpError } = require("../helpers");

const { Pet } = require("../models/pets");
const { ctrlWrapper } = require("../utils");

// const getAllPetsByOwner = async (req, res) => {
//   const { _id: owner } = req.user;
//   console.log("owner: ", owner);
//   const { page = 1, limit = 20, favorite } = req.query;
//   const skip = (page - 1) * limit;
//   const query = { owner };
//   if (favorite) {
//     query.favorite = favorite;
//   }
//   const result = await Contact.find(query, "", {
//     skip,
//     limit,
//   }).populate("owner");
//   res.json(result);
// };

// const getContactById = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await Contact.findById(contactId);
//   if (!result) {
//     throw HttpError(404, `Contact whith id: ${contactId} not found`);
//   }
//   res.json(result);
// };

const addPet = async (req, res) => {
  const { _id: owner } = req.user;
  console.log("owner: ", owner);
  const result = await Pet.create({ ...req.body, owner });
  res.status(201).json(result);
};

// const removeContact = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await Contact.findByIdAndDelete(contactId);
//   if (!result) {
//     throw HttpError(404, `Contact whith id: ${contactId} not found`);
//   }
//   res.json({ message: "Delete success" });
// };

// const changeContact = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await Contact.findByIdAndUpdate(contactId, req.body, {
//     new: true,
//   });
//   if (!result) {
//     throw HttpError(404, `Contact whith id: ${contactId} not found`);
//   }
//   res.json(result);
// };

// const updateFavorite = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await Contact.findByIdAndUpdate(contactId, req.body, {
//     new: true,
//   });
//   if (!result) {
//     throw HttpError(404, `Contact whith id: ${contactId} not found`);
//   }
//   res.json(result);
// };

module.exports = {
  // getAllPetsByOwner: ctrlWrapper(getAllPetsByOwner),
  // getContactById: ctrlWrapper(getContactById),
  addPet: ctrlWrapper(addPet),
  // removeContact: ctrlWrapper(removeContact),
  // changeContact: ctrlWrapper(changeContact),
  // updateFavorite: ctrlWrapper(updateFavorite),
};
