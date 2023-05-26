const bctypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { HttpError } = require("../helpers");

const { User } = require("../models/user");
const { ctrlWrapper } = require("../utils");
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bctypt.hash(password, 10);

  await User.create({
    ...req.body,
    password: hashPassword,
    avatarUrl:
      "https://res.cloudinary.com/dpzseqln4/image/upload/v1684607125/user-avatars/yjcbinzs0prjdk2k8qnd.png",
  });

  const userForToken = await User.findOne({ email });
  const payload = {
    id: userForToken._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  const data = await User.findByIdAndUpdate(userForToken._id, { token });

  res.status(201).json({
    data,
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Invalid email or password");
  }

  const passwordCompare = await bctypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Invalid email or password");
  }
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  const result = await User.findByIdAndUpdate(user._id, { token });
  res.json({
    result,
    token,
  });
};

const getCurrent = async (req, res) => {
  const user = req.user;
  res.json(user);
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.json({
    message: "Logout success",
    status: 204,
  });
};

const updateUserInfo = async (req, res) => {
  const { body } = req;
  console.log("body: ", body);

  const options = !req.file
    ? {
        ...body,
      }
    : { ...body, publicId: req.file.filename, avatarUrl: req.file.path };

  console.log("options: ", options);
  const { _id, email } = req.body;

  const result = await User.findOneAndUpdate(
    { _id },
    { ...options },
    { new: true }
  );

  if (!result) {
    throw HttpError(404);
  }

  const user = await User.findOne({ email });

  res.json(user);
};

const getUserInfo = async (req, res) => {
  console.log("req: ", req.params);
  const { userId } = req.params;
  console.log("userId: ", userId);
  const user = await User.findOne({ userId });
  if (!user) {
    throw HttpError(404);
  }
  res.json(user);
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateUserInfo),
  getUserInfo: ctrlWrapper(getUserInfo),
};
