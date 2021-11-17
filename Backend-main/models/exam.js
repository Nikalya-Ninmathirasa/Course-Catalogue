const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  exam_name: {
    type: String,
    required: true,
    trim: true,
  },
  creatorId: {
    type: String,
    required: [true, "creatorId required"],
  },
  location: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
  },
  time: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  fee: {
    type: String,
  },
  email: {
    type: String,
  },
  comments: {
    type: String,
  },
});

module.exports = mongoose.model("Exam", examSchema);
