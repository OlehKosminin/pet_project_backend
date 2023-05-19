const { HttpError } = require("../helpers");
const cloudinary = require("cloudinary").v2;
const { Pet } = require("../models/pets");
const { User } = require("../models/user");
const { ctrlWrapper } = require("../utils");

const petUserAdd = async (req, res) => {
  const owner = req.user.id;
  console.log("owner: ", owner);
  const petData = req.body;
  console.log("petData: ", petData);

  const photoURL = req.file.path;
  const publicId = req.file.filename;
  console.log("publicId: ", publicId);
  const data = !req.file
    ? { ...petData, owner }
    : { ...petData, owner, photoURL, publicId };

  Pet.create(data)
    .then((pet) => {
      if (pet) {
        User.findByIdAndUpdate(owner, photoURL, {
          $push: { userPets: pet._id },
        })
          .then((user) => {
            if (user) {
              res.status(201).json({ success: true, pet });
            }
          })
          .catch((err) => {
            throw new Error(err);
          });
      }
    })
    .catch((err) =>
      res.status(400).json({ success: false, error: err, message: err.message })
    );
};
const removePet = async (req, res) => {
  const { petId } = req.params;
  const { publicId } = await Pet.findById(petId);
  const result = await Pet.findByIdAndDelete(petId);
  if (result) {
    await cloudinary.api
      .delete_resources([publicId], {
        type: "upload",
        resource_type: "image",
      })
      .then(console.log);
  }
  if (!result) {
    throw HttpError(404, `Contact whith id: ${petId} not found`);
  }
  res.json({ message: "Delete success" });
};

const getMyAllPets = async (req, res) => {
  const { _id } = req.user;

  const result = await Pet.find({ owner: _id });
  res.json(result);
};

module.exports = {
  petUserAdd: ctrlWrapper(petUserAdd),
  removePet: ctrlWrapper(removePet),
  getMyAllPets: ctrlWrapper(getMyAllPets),
};
