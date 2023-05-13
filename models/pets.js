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
    place: { type: String, required: [true, "The place field must be filled"] },
    sex: { type: String, required: [true, "The sex field must be filled"] },
    comments: {
      type: String,
      required: [true, "The comments field must be filled"],
    },

    title: { type: String, required: [true, "The title field must be filled"] },
    category: {
      type: String,
      default: "sell",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "pets",
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
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
  email: Joi.string().required().messages({
    "any.required": '"email" is required',
    "string.empty": '"email" cannot be empty',
    "string.base": '"email" must be string',
  }),
  phone: Joi.string().required().messages({
    "any.required": '"phone" is required',
    "string.empty": '"phone" cannot be empty',
    "string.base": '"phone" must be string',
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
  phone: Joi.string().messages({
    "string.empty": '"phone" cannot be empty',
    "string.base": '"phone" must be string',
  }),
  favorite: Joi.boolean(),
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
