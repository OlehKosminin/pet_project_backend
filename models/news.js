const { model, Schema } = require("mongoose");

const newsShema = new Schema({
  imgUrl: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    default: null,
  },
  text: {
    type: String,
    default: null,
  },
  date: {
    type: String,
    default: null,
  },
  url: {
    type: String,
    default: null,
  },
  id: {
    type: String,
    default: null,
  },
});

const News = model("news", newsShema);

module.exports = News;
