const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["admin", "manager", "salesperson"], default: "salesperson" }
});

module.exports = mongoose.model("User", userSchema);