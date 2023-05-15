const { model, Schema } = require("mongoose");

const userSchema = new Schema({
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
    enum: ["your pet", "sell", "in good hands", "lost/found"],
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
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const Notices = model("notices", userSchema);

module.exports = Notices;