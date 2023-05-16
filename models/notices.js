const { model, Schema } = require("mongoose");

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
    type: String,
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
    default: null,
  },
  location: {
    type: String,
    required: [true, "The location field must be filled"],
  },
  price: {
    type: Number,
    default: null,
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

module.exports = Notices;
