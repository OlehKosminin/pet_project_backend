const express = require("express");

const { validateBody } = require("../../utils");

const { authenticate } = require("../../middlewares");

const { schemas } = require("../../models/user");

const ctrl = require("../../controllers/auth-controllers");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/users", authenticate, ctrl.updateSubscription);

router.get("/user-info", authenticate, ctrl.getUserInfo);

// router.post("/", authenticate, uploadCloud.single("image"), ctrl.userAddPhoto);

// router.patch(
//   "update-avatar",
//   authenticate,
//   upload.single("avatarURL"),
//   ctrl.updateAvatar
// );

module.exports = router;
