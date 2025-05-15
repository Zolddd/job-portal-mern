const express = require("express");
const {
  getEmployerApplications,
  updateApplicationStatus,
} = require("../controllers/applicationController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Get all applications for jobs posted by current employer
router.get("/", authMiddleware, getEmployerApplications);

// ✅ Update application status by employer
router.patch("/:id/status", authMiddleware, updateApplicationStatus);

module.exports = router;
