const { Schema, model } = require("mongoose");

const Joi = require("joi");

const { handleMongooseError } = require("../utils");

const petSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "The name field must be filled"],
    },
    birthday: {
      type: String,
      required: [true, "The birthday field must be filled"],
    },
    breed: { type: String, required: [true, "The breed field must be filled"] },
    comments: {
      type: String,
      required: [true, "The comments field must be filled"],
    },
    category: {
      type: String,
      default: "your pet",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "pets",
      required: true,
    },
    publicId: { type: String, default: "" },
    photoURL: { type: String, default: null },
  },
  { versionKey: false }
);

petSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": '"name" is required',
    "string.empty": '"name" cannot be empty',
    "string.base": '"name" must be string',
  }),
  birthday: Joi.string().required().messages({
    "any.required": '"birthday" is required',
    "string.empty": '"birthday" cannot be empty',
    "string.base": '"birthday" must be string',
  }),
  breed: Joi.string().required().messages({
    "any.required": '"breed" is required',
    "string.empty": '"breed" cannot be empty',
    "string.base": '"breed" must be string',
  }),
  comments: Joi.string().required().messages({
    "any.required": '"comments" is required',
    "string.empty": '"comments" cannot be empty',
    "string.base": '"comments" must be string',
  }),
  category: Joi.string().required().messages({
    "any.required": '"category" is required',
    "string.empty": '"category" cannot be empty',
    "string.base": '"category" must be string',
  }),
  owner: Joi.string().required().messages({
    "any.required": '"owner" is required',
    "string.empty": '"owner" cannot be empty',
    "string.base": '"owner" must be string',
  }),
  image: Joi.string().required().messages({
    "any.required": '"photoURL" is required',
    "string.empty": '"photoURL" cannot be empty',
    "string.base": '"photoURL" must be string',
  }),
  favorite: Joi.boolean(),
});

const addSchemaPut = Joi.object({
  name: Joi.string().messages({
    "string.empty": '"name" cannot be empty',
    "string.base": '"name" must be string',
  }),
  email: Joi.string().messages({
    "string.empty": '"email" cannot be empty',
    "string.base": '"email" must be string',
  }),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
  // .messages({ message: "missing field favorite" }),
});

const schemas = {
  addSchema,
  addSchemaPut,
  updateFavoriteSchema,
};

const Pet = model("pet", petSchema);

module.exports = { Pet, schemas };
