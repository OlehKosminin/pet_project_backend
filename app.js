const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./routes/api/auth-routes");
const petsRouter = require("./routes/api/pets-routes");
const notiesRouter = require("./routes/api/noties-routes");
const newsRouter = require("./routes/api/news-routes");
const servicesSidebarRouter = require("./routes/api/servicesSidebar-routes");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/pets", petsRouter);
app.use("/api/pets", notiesRouter);
app.use("/api/news", newsRouter);
app.use("/api/services-sidebar", servicesSidebarRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
