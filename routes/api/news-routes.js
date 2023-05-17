const express = require("express");

const { authenticate } = require("../../middlewares");

const ctrl = require("../../controllers/news-controllers");

const router = express.Router();

router.get("/", authenticate, ctrl.getNews);
// router.post("/", authenticate, ctrl.getNews);

module.exports = router;
