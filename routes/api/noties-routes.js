const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/noties-controler");

const { authenticate } = require("../../middlewares");
// isValidId,
// const { validateBody } = require("../../utils");

// const { schemas } = require("../../models/pets");

router.get("/", authenticate, ctrl.getAllContacts);

module.exports = router;
