import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const EmployerDashboard = () => {
  const { authData } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch jobs posted by employer
  useEffect(() => {
    if (!authData?.token) return;
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/jobs", {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        });
        // Assuming API returns only jobs posted by employer or filter here if needed
        setJobs(res.data);
      } catch (err) {
        setError("Failed to load jobs.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [authData]);

  if (loading)
    return <p className="text-center mt-20">Loading your jobs...</p>;

  if (error)
    return <p className="text-center mt-20 text-red-600">{error}</p>;

  return (
    <motion.div
      className="max-w-6xl mx-auto px-6 py-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl font-bold mb-8 mt-[45px] text-center">
        Your Job Postings
      </h1>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">
          You have not posted any jobs yet.
        </p>
      ) : (
        <div className="space-y-6">
          {jobs.map((job) => (
            <motion.div
              key={job._id}
              className="p-6 border rounded-xl shadow-md bg-white dark:bg-gray-800"
              whileHover={{ scale: 1.02 }}
            >
              <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                Location: {job.location}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                Type: {job.type}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                Salary: {job.salary}
              </p>
              <p className="mb-4">{job.description}</p>
              {/* You can add buttons here to view applications or edit job */}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default EmployerDashboard;
