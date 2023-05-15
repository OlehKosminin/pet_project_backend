const { HttpError } = require("../helpers");
const cloudinary = require("cloudinary").v2;
const { Pet } = require("../models/pets");
const { User } = require("../models/user");
const { ctrlWrapper } = require("../utils");

const petUserAdd = async (req, res) => {
  const owner = req.user.id;
  const petData = req.body;

  const photoURL = req.file.path;
  const data = !req.file
    ? { photoURL, owner, ...petData }
    : { owner, ...petData, photoURL };
  console.log("data: ", data);

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

  const result = await Pet.findByIdAndDelete(petId);
  if (result) {
    cloudinary.api.delete_resources(["v1684148506/sqnhtt49unw2ubvy4oom"]);
  }
  if (!result) {
    throw HttpError(404, `Contact whith id: ${petId} not found`);
  }
  res.json({ message: "Delete success" });
};

module.exports = {
  petUserAdd: ctrlWrapper(petUserAdd),
  removePet: ctrlWrapper(removePet),
};
