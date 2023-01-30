const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  nickName: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  score: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
