const { HttpError } = require("../helpers");

const { ctrlWrapper } = require("../utils");
const { ImageService } = require("../services/ImageService");
const { Notices } = require("../models/notices");

const createNotice = async (req, res) => {
  const { file } = req;
  if (!file) throw HttpError(404, "The image was not uploaded");
  const imageUrl = await ImageService.save(req.file, {
    height: 300,
    width: 400,
  });
  console.log(imageUrl);

  const noticesNew = await Notices.create({
    photoUrl: imageUrl,
    public_id: file.filename,
    ...req.body,
    owner: req.user,
  });

  res.status(201).json({ notice: noticesNew });
};

const getNoticesByCategory = async (req, res) => {
  const { page = 1, limit = 12, category } = req.query;
  const skip = (page - 1) * limit;

  const result = await Notices.find({ category }).skip(skip).limit(limit);

  res.status(200).json({ result });
};

const getNoticesUser = async (req, res) => {
  const { page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;

  const result = await Notices.find({ owner: req.user })
    .skip(skip)
    .limit(limit);

  res.status(200).json({ result });
};

const getNoticesById = async (req, res) => {
  const { noticeId } = req.params;
  if (!noticeId) throw HttpError(400, "You did not fill id");

  const result = await Notices.findById(noticeId);

  if (!result) throw HttpError(404, "Not found notices by id");

  res.status(200).json({ result });
};
const deleteNoticesById = async (req, res) => {
  const { noticeId } = req.params;
  if (!noticeId) throw HttpError(400, "You did not fill id");

  const result = await Notices.findOneAndDelete({
    _id: noticeId,
    owner: req.user,
  });

  if (!result)
    throw HttpError(404, "Notices by id did not find in your account");

  res.status(200).json({ status: "Deleted" });
};

module.exports = {
  getNoticesByCategory: ctrlWrapper(getNoticesByCategory),
  getNoticesById: ctrlWrapper(getNoticesById),
  getNoticesUser: ctrlWrapper(getNoticesUser),
  createNotice: ctrlWrapper(createNotice),
  deleteNoticesById: ctrlWrapper(deleteNoticesById),
};
