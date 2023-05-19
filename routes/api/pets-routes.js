const express = require("express");

const router = express.Router();

const { isValidId } = require("../../middlewares");

const ctrl = require("../../controllers/pets-controllers");

const { authenticate, uploadCloud } = require("../../middlewares");

router.post("/", authenticate, uploadCloud.single("image"), ctrl.petUserAdd);

router.delete("/:petId", authenticate, isValidId, ctrl.removePet);

router.get("/my-pets", authenticate, ctrl.getMyAllPets);

module.exports = router;
