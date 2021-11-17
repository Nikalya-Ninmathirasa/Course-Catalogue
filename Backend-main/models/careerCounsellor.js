const mongoose = require("mongoose");

const careercounsellorSchema = new mongoose.Schema({
  counsellor_name: {
    type: String,
    required: [true, "Please enter Your Name"],
    trim: true,
    maxLength: [50, "CareerCounsellor name cannot exceed 50 characters"],
  },
  designation: {
    type: String,
    required: [true, "Please Enter Your Designation"],
    trim: true,
  },
  placeofwork: {
    type: String,
    required: [true, "Please Enter Your Place of Work "],
    trim: true,
  },
  fieldofexpert: {
    type: String,
    required: [true, "Please Select Your Field of Study"],
    trim: true,
  },
  linkedin: {
    type: String,
    required: [true, "Please Paste Your LinkedIn Link"],
    trim: true,
  },
  personallink: {
    type: String,
    required: [true, "Please Paste Your Personal Website Link"],
    trim: true,
  },
  contact: {
    type: Number,
    required: [true, "Please enter Field of Study"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  creatorId: {
    type: String,
    required: [true, "creatorId required"],
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("CareerCounsellor", careercounsellorSchema);
