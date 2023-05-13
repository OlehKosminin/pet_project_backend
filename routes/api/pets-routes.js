const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/pets-controllers");

const { isValidId, authenticate } = require("../../middlewares");

const { validateBody } = require("../../utils");

const { schemas } = require("../../models/pets");

// router.get("/", authenticate, ctrl.getAllPetsByOwner);

// router.get("/:contactId", authenticate, isValidId, ctrl.getContactById);

router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.addPet);

// router.delete("/:contactId", authenticate, isValidId, ctrl.removeContact);

// router.put(
//   "/:contactId",
//   authenticate,
//   isValidId,
//   validateBody(schemas.addSchemaPut),
//   ctrl.changeContact
// );

// router.patch(
//   "/:contactId/favorite",
//   authenticate,
//   isValidId,
//   validateBody(schemas.updateFavoriteSchema),
//   ctrl.updateFavorite
// );

module.exports = router;
