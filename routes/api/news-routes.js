const express = require("express");

const ctrl = require("../../controllers/news-controllers");

const router = express.Router();

router.get("/", ctrl.getNews);

module.exports = router;
