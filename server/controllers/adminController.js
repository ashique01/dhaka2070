const Admin = require("../models/Admin");
const generateToken = require("../utils/generateToken");

exports.registerAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = await Admin.create({ username, password });

    res.status(201).json({
      _id: admin._id,
      username: admin.username,
      token: generateToken(admin._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });

    if (!admin || !(await admin.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      _id: admin._id,
      username: admin.username,
      token: generateToken(admin._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Optional - Example for protected route
exports.getDashboardData = async (req, res) => {
  res.json({ message: `Welcome Admin ${req.admin.username}` });
};
