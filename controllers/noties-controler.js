const { HttpError } = require("../helpers");

const { ctrlWrapper } = require("../utils");
const { ImageService, cloudinary } = require("../services/ImageService");
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

  res.status(201).json({ result: noticesNew });
};

const getNoticesByCategoryAndSearch = async (req, res) => {
  const { page = 1, limit = 12, category = "sell", search } = req.query;
  const skip = (page - 1) * limit;

  const findOptions = search
    ? { title: { $regex: search, $options: "i" }, category }
    : { category };

  const resultCount = await Notices.count(findOptions);
  const result = await Notices.find(findOptions).skip(skip).limit(limit);

  res.status(200).json({ result, resultCount });
};

const getNoticesUser = async (req, res) => {
  const { page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;

  const resultCount = await Notices.count({ owner: req.user });
  const result = await Notices.find({ owner: req.user })
    .skip(skip)
    .limit(limit);

  res.status(200).json({ result, resultCount });
};

const getNoticesById = async (req, res) => {
  const { noticeId } = req.params;
  if (!noticeId) throw HttpError(400, "You did not fill id notice");

  const result = await Notices.findById(noticeId);

  if (!result) throw HttpError(404, "Not found notices by id");

  res.status(200).json({ result });
};
const deleteNoticesById = async (req, res) => {
  const { noticeId } = req.params;
  if (!noticeId) throw HttpError(400, "You did not fill id notice");

  const result = await Notices.findOneAndDelete({
    _id: noticeId,
    owner: req.user,
  });

  if (!result)
    throw HttpError(404, "Notices by id did not find in your account");

  await cloudinary.uploader.destroy(result.public_id, (error, result) => {
    if (error)
      throw HttpError(
        400,
        `Error while deleting a photo from Cloudinary: ${error}`
      );
    console.log("The photo successful deleted into Cloudinary:", result);
  });

  res.status(200).json({ status: "Deleted" });
};

const addNoticesFavorite = async (req, res) => {
  const { noticeId } = req.params;
  if (!noticeId) throw HttpError(404, "You did not fill id notice");

  const result = await Notices.findById(noticeId);

  if (!result) throw HttpError(404, "Not found notice by id");

  const isFavorite = result.favorite.includes(req.user._id);
  if (isFavorite) throw HttpError(400, "This notice already added");

  result.favorite = [...result.favorite, req.user._id];
  await result.save();

  res.status(200).json({ status: "Added in favorite" });
};

const deletedNoticesFavorite = async (req, res) => {
  const { noticeId } = req.params;
  if (!noticeId) throw HttpError(404, "You did not fill id notice");

  const result = await Notices.findById(noticeId);

  if (!result) throw HttpError(404, "Not found notice by id");

  const idUserIndex = result.favorite.indexOf(req.user._id);

  if (idUserIndex === -1)
    throw HttpError(404, "This notice not  found in favorite");

  result.favorite.splice(idUserIndex, 1);
  await result.save();

  res.status(200).json({ status: "Deleted in favorite" });
};

const getNoticesFavorite = async (req, res) => {
  const { page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;

  const findOptions = { favorite: { $in: [req.user._id] } };

  const resultCount = await Notices.count(findOptions);
  const result = await Notices.find(findOptions).skip(skip).limit(limit);

  if (!result) throw HttpError(404, "Not found favorite notices");

  res.status(200).json({ result, resultCount });
};

module.exports = {
  getNoticesByCategoryAndSearch: ctrlWrapper(getNoticesByCategoryAndSearch),
  getNoticesById: ctrlWrapper(getNoticesById),
  getNoticesUser: ctrlWrapper(getNoticesUser),
  createNotice: ctrlWrapper(createNotice),
  deleteNoticesById: ctrlWrapper(deleteNoticesById),
  addNoticesFavorite: ctrlWrapper(addNoticesFavorite),
  deletedNoticesFavorite: ctrlWrapper(deletedNoticesFavorite),
  getNoticesFavorite: ctrlWrapper(getNoticesFavorite),
};
