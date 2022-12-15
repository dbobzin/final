require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

const path = require("path");
// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

app.use(express.static(path.join(__dirname + "/public")));
//routes
const fs = require("node:fs");
const public_html = path.join(__dirname + "/public");
app.get("*", (req, res) => {
  res.sendFile(path.join(public_html, "index.html"));
});

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT || 4000, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
