const mongoose = require("mongoose");

const instituteSchema = new mongoose.Schema({
  InstituteName: {
    type: String,
    required: true,
    trim: true,
  },
  creatorId: {
    type: String,
    required: [true, "creatorId required"],
  },

  InstituteType: {
    type: String,
    required: true,
    trim: true,
  },

  District: {
    type: String,
    required: true,
    trim: true,
  },

  Address: {
    type: String,
    trim: true,
  },

  Email: {
    type: String,
  },

  ContactNumber: {
    type: String,
  },

  image: {
    type: String,
  }
});

module.exports = mongoose.model("Institute", instituteSchema);
