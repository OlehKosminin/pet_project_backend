const { model, Schema } = require("mongoose");

const servicesSidebarShema = new Schema({});

const ServicesSidebar = model("partner", servicesSidebarShema);

module.exports = ServicesSidebar;
