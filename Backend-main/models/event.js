const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
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

  time: {
    type: String,
  },
  date: {
    type: Date,
  },
  registrationurl: {
    type: String,
    required: true,
  },
  fee: {
    type: String,
    require: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },

  image: {
    type: String,
  }
});

module.exports = mongoose.model("Event", eventSchema);
