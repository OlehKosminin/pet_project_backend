const { model, Schema } = require("mongoose");
const Joi = require("joi");

const noticesSchema = new Schema({
  title: {
    type: String,
    required: [true, "Set title for notices"],
  },
  name: {
    type: String,
    required: [true, "Set name for notices"],
  },
  birthday: {
    type: Number,
    required: [true, "Set birthday for notices"],
  },
  breed: {
    type: String,
    required: [true, "Set breed for notices"],
  },
  sex: {
    type: String,
    enum: ["male", "female", "unknown"],
    default: "unknown",
  },
  category: {
    type: String,
    enum: ["sell", "in good hands", "lost/found"],
    default: "sell",
  },
  comments: {
    type: String,
    required: [true, "The comments field must be filled"],
  },
  photoUrl: {
    type: String,
    required: [true, "The photo field must be filled"],
  },
  public_id: {
    type: String,
    required: [true, "The public_id field must be filled"],
  },
  location: {
    type: String,
    required: [true, "The location field must be filled"],
  },
  price: {
    type: Number,
    default: 0,
  },
  favorite: {
    type: Array,
    default: [],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const Notices = model("notices", noticesSchema);

const noticesCreateValidator = (data) =>
  Joi.object()
    .keys({
      title: Joi.string().min(2).max(30).required(),
      name: Joi.string().min(2).max(16).required(),
      birthday: Joi.number().required(),
      breed: Joi.string().min(2).max(16).required(),
      sex: Joi.string().valid("male", "female", "unknown").default("unknown"),
      category: Joi.string()
        .valid("sell", "in good hands", "lost/found")
        .default("sell"),
      comments: Joi.string().min(8).max(120),
      location: Joi.string().min(2).max(20),
      price: Joi.number().min(0).default(0),
    })
    .options({ stripUnknown: true })
    .validate(data);

module.exports = {
  Notices,
  noticesCreateValidator,
};
