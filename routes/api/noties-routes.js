const express = require("express");

const router = express.Router();

const { ImageService } = require("../../services/ImageService");

const ctrl = require("../../controllers/noties-controler");

const { authenticate } = require("../../middlewares");
const { isValidPostNotices } = require("../../middlewares/isValidNotices");

router.get("/category", ctrl.getNoticesByCategoryAndSearch);
router.get("/favorite", authenticate, ctrl.getNoticesFavorite);
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
router.patch("/favorite-add/:noticeId", authenticate, ctrl.addNoticesFavorite);
router.patch(
  "/favorite-delete/:noticeId",
  authenticate,
  ctrl.deletedNoticesFavorite
);

module.exports = router;
