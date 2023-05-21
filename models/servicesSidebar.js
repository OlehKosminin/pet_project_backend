const { model, Schema } = require("mongoose");

const servicesSidebarShema = new Schema(
  {
    title: {
      type: String,
    },
    url: {
      type: String,
    },
    addressUrl: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    address: {
      type: String,
    },
    workDays: {
      type: Array,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

const ServicesSidebar = model("partner", servicesSidebarShema);

module.exports = ServicesSidebar;
