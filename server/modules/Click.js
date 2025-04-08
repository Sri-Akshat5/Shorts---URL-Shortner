const mongoose = require("mongoose");

const clickSchema = new mongoose.Schema({
  linkId: { type: mongoose.Schema.Types.ObjectId, ref: "Link", required: true },
  timestamp: { type: Date, default: Date.now },
  ip: { type: String },
  device: { type: String },
  browser: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Click", clickSchema);

 


