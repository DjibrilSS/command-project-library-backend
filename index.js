const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path")
const cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(require("./routes/book.routes"));
app.use(require("./routes/genre.routes"));
app.use(express.static(path.resolve(__dirname, "public")));
app.use("/public",express.static(path.resolve(__dirname, "public")));
app.use(require("./routes/user.routes"));

app.use("/api",require("./routes/upload.route"))

mongoose.connect(
  "mongodb+srv://Djabrail:4815162342@cluster0.wkvhjdw.mongodb.net/library",
  () => {
    app.listen(4000, () => {
      console.log("worked and connected");
    });
  }
);
