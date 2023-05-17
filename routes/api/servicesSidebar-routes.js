const express = require("express");

const { authenticate } = require("../../middlewares");

const ctrl = require("../../controllers/servicesSidebar-controllers");

const router = express.Router();

router.get("/", authenticate, ctrl.getPartnerInfo);

module.exports = router;
