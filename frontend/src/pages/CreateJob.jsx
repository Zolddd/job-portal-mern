import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { motion } from "framer-motion";

const CreateJob = () => {
  const { authData } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    type: "Full-time",
    salary: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authData?.token || authData?.user?.role !== "employer") {
      setError("Only employers can post jobs.");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/jobs", form, {
        headers: {
          Authorization: `Bearer ${authData.token}`,
        },
      });
      navigate("/employer/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto px-6 py-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-8 mt-[45px] text-center">Post a New Job</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow space-y-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white"
        />

        <textarea
          name="description"
          placeholder="Job Description"
          rows={4}
          value={form.description}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white"
        ></textarea>

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white"
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white"
        >
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
        </select>

        <input
          type="text"
          name="salary"
          placeholder="Salary"
          value={form.salary}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white"
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition"
        >
          {loading ? "Posting..." : "Create Job"}
        </button>
      </form>
    </motion.div>
  );
};

export default CreateJob;
