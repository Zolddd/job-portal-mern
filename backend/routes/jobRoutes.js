const express = require("express");
const { createJob, getAllJobs, applyToJob } = require("../controllers/jobController");
const authMiddleware = require("../middleware/authMiddleware");
const Application = require("../models/Application"); // Add this line

const router = express.Router();

router.post("/", authMiddleware, createJob); // Employer
router.get("/", getAllJobs);                 // Public

router.post("/:id/apply", authMiddleware, applyToJob); // Applicant

// NEW: Get all applications for logged-in applicant
router.get("/my-applications", authMiddleware, async (req, res) => {
  try {
    const applications = await Application.find({ applicantId: req.user.id })
      .populate("jobId")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch applications", error: err.message });
  }
});

module.exports = router;
