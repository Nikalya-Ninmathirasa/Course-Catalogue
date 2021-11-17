const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_firstname: {
    type: String,
    trim: true,
  },
  user_lastname: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: true
  },
  phoneno: {
    type: String,
    trim: true,
  },
  country: {
    type: String,
    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
