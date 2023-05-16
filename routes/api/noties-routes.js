const express = require("express");

const router = express.Router();

const ImageService = require("../../services/ImageService");

const ctrl = require("../../controllers/noties-controler");

const { authenticate } = require("../../middlewares");
// isValidId,
// const { validateBody } = require("../../utils");

// const { schemas } = require("../../models/pets");

router.post("/", authenticate, ImageService.upload("image"), ctrl.createNotice);

router.get("/", authenticate, ctrl.getAllContacts);

module.exports = router;
