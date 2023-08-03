const mongoose = require("mongoose");

const attendenceSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  duration: {
    type: Number,
  },
  lastTimestamp: Number,
});

const Attendence = mongoose.model("Attendence", attendenceSchema);

module.exports = Attendence;
