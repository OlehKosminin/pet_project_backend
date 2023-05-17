const News = require("../models/news");
const { ctrlWrapper } = require("../utils");

const getNews = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  const result = await News.find().limit(limit).skip(skip);

  res.json(result);
};

module.exports = {
  getNews: ctrlWrapper(getNews),
};
