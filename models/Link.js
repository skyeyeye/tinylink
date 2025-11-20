// models/Link.js
const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true , unique: true },
  targetUrl: { type: String, required: true },
  clicks: { type: Number, default: 0 },
  lastClicked: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Link", linkSchema);
