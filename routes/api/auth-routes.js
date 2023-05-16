const express = require("express");

const { validateBody } = require("../../utils");

const { authenticate, uploadCloudAvatars } = require("../../middlewares");

const { schemas } = require("../../models/user");

const ctrl = require("../../controllers/auth-controllers");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/user-upd",
  authenticate,
  uploadCloudAvatars.single("avatarUrl"),
  ctrl.updateSubscription
);

router.get("/user-info", authenticate, ctrl.getUserInfo);

module.exports = router;
