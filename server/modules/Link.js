const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
  longUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  expiresAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  totalClicks: { type: Number, default: 0 },
});

module.exports = mongoose.model("Link", linkSchema);
