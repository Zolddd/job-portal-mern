const Job = require("../models/Job");
const Application = require("../models/Application");

exports.createJob = async (req, res) => {
  try {
    if (req.user.role !== "employer") return res.status(403).json({ message: "Access denied" });
    const job = await Job.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.applyToJob = async (req, res) => {
  try {
    const { id: jobId } = req.params;
    const { resumeLink, comment } = req.body;

    const application = await Application.create({
      jobId,
      applicantId: req.user.id,
      resumeLink,
      comment,
    });

    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
