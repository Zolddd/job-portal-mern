const Application = require("../models/Application");
const Job = require("../models/Job");

// ✅ GET /api/employer/applications
const getEmployerApplications = async (req, res) => {
  try {
    // ✅ Fix: use correct field from Job model (createdBy, not employer)
    const jobs = await Job.find({ createdBy: req.user.id });

    const jobIds = jobs.map((job) => job._id);

    const applications = await Application.find({ jobId: { $in: jobIds } })
      .populate("jobId", "title location type salary") // select only needed job fields
      .populate("applicantId", "name email"); // select applicant info

    res.json(applications);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch applications",
      error: err.message,
    });
  }
};

// ✅ PATCH /api/employer/applications/:id/status
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Applied", "Shortlisted", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const application = await Application.findById(req.params.id).populate("jobId");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // ✅ Ensure the employer owns this job
    if (String(application.jobId.createdBy) !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this application" });
    }

    application.status = status;
    await application.save();

    res.json({ message: "Status updated", application });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update application status",
      error: err.message,
    });
  }
};

module.exports = {
  getEmployerApplications,
  updateApplicationStatus,
};
