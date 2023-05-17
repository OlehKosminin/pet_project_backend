const express = require("express");

const ctrl = require("../../controllers/servicesSidebar-controllers");

const router = express.Router();

router.get("/", ctrl.getPartnerInfo);

module.exports = router;
