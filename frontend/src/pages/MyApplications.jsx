import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const MyApplications = () => {
  const { authData } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyApplications = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/jobs/my-applications", {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        });
        setApplications(res.data);
      } catch (err) {
        setError("Failed to fetch applications.");
      } finally {
        setLoading(false);
      }
    };

    if (authData?.token && authData.user.role === "applicant") {
      fetchMyApplications();
    } else {
      setError("Unauthorized access.");
      setLoading(false);
    }
  }, [authData]);

  if (loading)
    return <p className="text-center mt-20">Loading applications...</p>;

  if (error)
    return <p className="text-center mt-20 text-red-600">{error}</p>;

  return (
    <motion.div
      className="max-w-5xl mx-auto px-6 py-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl font-bold mb-8 mt-[45px] text-center">My Applications</h1>

      {applications.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">
          You haven’t applied to any jobs yet.
        </p>
      ) : (
        <div className="space-y-6">
          {applications.map((app) => (
            <motion.div
              key={app._id}
              className="p-6 bg-white dark:bg-gray-800 border rounded-xl shadow"
              whileHover={{ scale: 1.01 }}
            >
              <h2 className="text-xl font-semibold mb-2">
                {app.jobId?.title || "Job Title"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                <strong>Location:</strong> {app.jobId?.location}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                <strong>Resume:</strong>{" "}
                <a
                  href={app.resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  View Resume
                </a>
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                <strong>Comment:</strong> {app.comment}
              </p>
              <p className="text-sm font-semibold">
                <strong>Status:</strong>{" "}
                <span
                  className={`inline-block px-2 py-1 rounded-full ${
                    app.status === "Rejected"
                      ? "bg-red-100 text-red-600"
                      : app.status === "Shortlisted"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {app.status}
                </span>
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default MyApplications;
