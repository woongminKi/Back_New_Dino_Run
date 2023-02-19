require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.connect(process.env.NEW_MONGO_URL, {
  useNewUrlParser: true,
});

const index = require("./routes/index");
const user = require("./routes/user");
const rooms = require("./routes/rooms");

const app = express();
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);
app.use("/user", user);
app.use("/rooms", rooms);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.json({ message: err.message, status: err.status });
});

module.exports = app;
