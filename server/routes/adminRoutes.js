const express = require("express");
const {
  registerAdmin,
  loginAdmin,
  getDashboardData,
} = require("../controllers/adminController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerAdmin);  // optional
router.post("/login", loginAdmin);
router.get("/dashboard", protect, getDashboardData); // protected test route

module.exports = router;
