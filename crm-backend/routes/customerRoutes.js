const express = require("express");
const Customer = require("../models/Customer");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// ✅ Add a new customer
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, email, phone, company, address } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Name, email, and phone are required" });
    }

    const newCustomer = new Customer({
      name,
      email,
      phone,
      company,
      address,
      userId: req.user.userId,
    });

    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Get all customers (only for logged-in user)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const customers = await Customer.find({ userId: req.user.userId });
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Get a single customer
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    res.json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Update a customer
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedCustomer = await Customer.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );

    if (!updatedCustomer) return res.status(404).json({ message: "Customer not found" });

    res.json(updatedCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Delete a customer
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedCustomer = await Customer.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (!deletedCustomer) return res.status(404).json({ message: "Customer not found" });

    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;

