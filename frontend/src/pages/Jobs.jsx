import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters
  const [filterType, setFilterType] = useState("");
  const [filterLocation, setFilterLocation] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/jobs");
        setJobs(res.data);
      } catch (err) {
        setError("Failed to load jobs.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Filter jobs locally
  const filteredJobs = jobs.filter((job) => {
    const matchesType =
      !filterType || job.type.toLowerCase() === filterType.toLowerCase();
    const matchesLocation =
      !filterLocation ||
      job.location.toLowerCase().includes(filterLocation.toLowerCase());
    return matchesType && matchesLocation;
  });

  if (loading)
    return <p className="text-center mt-20">Loading jobs...</p>;

  if (error)
    return <p className="text-center mt-20 text-red-600">{error}</p>;

  return (
    <motion.div
      className="max-w-7xl mx-auto px-6 py-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl font-bold mb-8 mt-[45px] text-center">Available Jobs</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-center mb-10">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        >
          <option value="">All Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
        </select>

        <input
          type="text"
          placeholder="Search by Location"
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        />
      </div>

      {/* Job Listings */}
      {filteredJobs.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">
          No jobs match your filter.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {filteredJobs.map((job) => (
            <motion.div
              key={job._id}
              className="p-6 border rounded-xl shadow-md bg-white dark:bg-gray-800 flex flex-col justify-between"
              whileHover={{ scale: 1.02 }}
            >
              <div>
                <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-1">
                  Location: {job.location}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-1">
                  Type: {job.type}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Salary: {job.salary}
                </p>
                <p className="line-clamp-3">{job.description}</p>
              </div>

              <Link
                to={`/jobs/${job._id}/apply`}
                className="mt-4 self-start px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
              >
                Apply Now
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Jobs;
