const ServicesSidebar = require("../models/servicesSidebar");
const { ctrlWrapper } = require("../utils");

const getPartnerInfo = async (req, res) => {
  const result = await ServicesSidebar.find();

  res.json(result);
};

module.exports = {
  getPartnerInfo: ctrlWrapper(getPartnerInfo),
};
