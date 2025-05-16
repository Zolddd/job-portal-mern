import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { motion } from "framer-motion";

const Applications = () => {
  const { authData } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/employer/applications", {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        });
        setApplications(res.data);
      } catch (err) {
        setError("Failed to load applications.");
      } finally {
        setLoading(false);
      }
    };

    if (authData?.token && authData.user.role === "employer") {
      fetchApplications();
    } else {
      setError("Unauthorized access.");
      setLoading(false);
    }
  }, [authData]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      setUpdating((prev) => ({ ...prev, [id]: true }));
      await axios.patch(
        `http://localhost:5000/api/employer/applications/${id}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );
      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status: newStatus } : app
        )
      );
    } catch (err) {
      alert("Failed to update status");
    } finally {
      setUpdating((prev) => ({ ...prev, [id]: false }));
    }
  };

  if (loading)
    return <p className="text-center mt-20">Loading applications...</p>;

  if (error)
    return <p className="text-center mt-20 text-red-600">{error}</p>;

  return (
    <motion.div
      className="max-w-6xl mx-auto px-6 py-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl font-bold mb-8 mt-[45px] text-center">Job Applications</h1>

      {applications.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">
          No one has applied to your jobs yet.
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
                {app.jobId?.title || "Unknown Job"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                <strong>Applicant:</strong> {app.applicantId?.name || "N/A"}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                <strong>Email:</strong> {app.applicantId?.email || "N/A"}
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
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                <strong>Comment:</strong> {app.comment}
              </p>

              <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-1">
                Status:
              </label>
              <select
                value={app.status}
                disabled={updating[app._id]}
                onChange={(e) => handleStatusChange(app._id, e.target.value)}
                className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
              >
                <option value="Applied">Applied</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Applications;
