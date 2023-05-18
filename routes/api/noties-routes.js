const express = require("express");

const router = express.Router();

const { ImageService } = require("../../services/ImageService");

const ctrl = require("../../controllers/noties-controler");

const { authenticate } = require("../../middlewares");
const { isValidPostNotices } = require("../../middlewares/isValidNotices");

router.post(
  "/",
  authenticate,
  ImageService.upload("image"),
  isValidPostNotices,
  ctrl.createNotice
);
router.get("/", authenticate, ctrl.getNoticesUser);
router.delete("/:noticeId", authenticate, ctrl.deleteNoticesById);

router.get("/:noticeId", ctrl.getNoticesById);
router.get("/category", ctrl.getNoticesByCategory);

module.exports = router;
