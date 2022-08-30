const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
app.use(cors());

app.use(express.static("public"));
app.use(require("./routes/book.routes"));
app.use(require("./routes/genre.routes"));
app.use(require("./routes/user.routes"));

mongoose.connect(
  "mongodb+srv://Djabrail:4815162342@cluster0.wkvhjdw.mongodb.net/library",
  () => {
    app.listen(process.env.PORT, () => {
      console.log("worked and connected");
    });
  }
);
