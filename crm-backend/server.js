const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoutes");
const customerRoutes = require("./routes/customerRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);
app.use("/customers", customerRoutes);

// Connect to MongoDB

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Database Connected Successfully"))
  .catch(err => console.error("❌ Database Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));



