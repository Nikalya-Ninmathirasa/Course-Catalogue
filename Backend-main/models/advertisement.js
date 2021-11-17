const mongoose = require("mongoose");

const AdvertisementSchema = new mongoose.Schema({
  ad_name: {
    type: String,
    required: [true, "Enter the Advertisement name"],
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

module.exports = mongoose.model("Advertisement", AdvertisementSchema);
