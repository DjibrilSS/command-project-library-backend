const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  password: String,
  login: {
    type: String,
  },
  rent: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Book",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
