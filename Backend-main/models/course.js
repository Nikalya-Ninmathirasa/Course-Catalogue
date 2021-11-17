const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  course_name: {
    type: String,
    trim: true,
    maxLength: [50, "Course name  cannot exceed 50 characters"],
  },
  creatorId: {
    type: String,
    required: [true, "creatorId required"],
  },
  mediumofstudy: {
    type: String,
    trim: true,
  },
  modeofstudy: {
    type: String,
    trim: true,
  },
  fieldofstudy: {
    type: String,
    trim: true,
  },
  courselevel: {
    type: String,
    trim: true,
  },
  durationofstudy: {
    type: Number,
    trim: true,
  },
  cost: {
    type: Number,
    trim: true,
  },
  results: {
    type: String,
    trim: true,
  },
  description: {
    type: String,

    trim: true,
    maxLength: [100, "Description cannot exceed  100 characters"],
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("Course", courseSchema);
