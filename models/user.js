const { Schema, model } = require("mongoose");

const Joi = require("joi");

const { handleMongooseError } = require("../utils");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlingth: 6,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    birthday: {
      type: String,
      default: "00.00.0000",
    },
    phone: {
      type: String,
      default: "+380634567891",
    },
    city: {
      type: String,
      default: "Kyiv",
    },
    name: {
      type: String,
      default: "Your name",
    },
    avatarUrl: {
      type: String,
      default: null,
    },
    publicId: {
      type: String,
      default: "",
    },
    token: {
      type: String,
      default: null,
    },
    favoritePets: {
      type: Array,
      default: [],
    },
  },
  { versionKey: false }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
