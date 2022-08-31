const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  password: String,
  login: {
    type: String,
  },
  rent: [
    {
      type:mongoose.Types.ObjectId,
      ref: "Book",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
