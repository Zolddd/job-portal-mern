import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const ApplyJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authData } = useAuth();

  const [job, setJob] = useState(null);
  const [form, setForm] = useState({ resumeLink: "", comment: "" });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/jobs`);
        const found = res.data.find((j) => j._id === id);
        if (!found) throw new Error("Job not found");
        setJob(found);
      } catch (err) {
        setError("Failed to load job.");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authData?.token || authData?.user?.role !== "applicant") {
      setError("Only applicants can apply.");
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(
        `http://localhost:5000/api/jobs/${id}/apply`,
        form,
        {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );
      navigate("/jobs");
    } catch (err) {
      setError(err.response?.data?.message || "Application failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-center mt-20">Loading job...</p>;
  if (error) return <p className="text-center mt-20 text-red-600">{error}</p>;

  return (
    <motion.div
      className="max-w-3xl mx-auto px-6 py-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl font-bold mb-6 mt-[45px]">{job.title}</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-10">
        <p className="mb-2"><strong>Description:</strong> {job.description}</p>
        <p className="mb-1"><strong>Location:</strong> {job.location}</p>
        <p className="mb-1"><strong>Type:</strong> {job.type}</p>
        <p className="mb-1"><strong>Salary:</strong> {job.salary}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Apply for this job</h2>
        <input
          type="url"
          name="resumeLink"
          value={form.resumeLink}
          onChange={handleChange}
          required
          placeholder="Resume URL"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white"
        />
        <textarea
          name="comment"
          value={form.comment}
          onChange={handleChange}
          rows={4}
          placeholder="Why are you a good fit?"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white"
        ></textarea>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition"
        >
          {submitting ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </motion.div>
  );
};

export default ApplyJob;
