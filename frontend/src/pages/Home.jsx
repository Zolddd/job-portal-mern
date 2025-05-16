import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Briefcase, Users, Send } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { authData } = useAuth();
  const role = authData?.user?.role;

  // Role-based card content
  let cards = [];

  if (role === "employer") {
    cards = [
      {
        title: "Post a Job",
        desc: "Create listings and hire top talent.",
        to: "/create-job",
        icon: <Briefcase className="w-10 h-10 mb-3 text-indigo-600" />,
      },
      {
        title: "View Applications",
        desc: "See who's applied to your job posts.",
        to: "/applications",
        icon: <Send className="w-10 h-10 mb-3 text-purple-600" />,
      },
      {
        title: "Employer Dashboard",
        desc: "Manage jobs and view insights.",
        to: "/employer/dashboard",
        icon: <Users className="w-10 h-10 mb-3 text-pink-600" />,
      },
    ];
  } else if (role === "applicant") {
    cards = [
      {
        title: "Browse Jobs",
        desc: "Find and apply to jobs easily.",
        to: "/jobs",
        icon: <Briefcase className="w-10 h-10 mb-3 text-indigo-600" />,
      },
      {
      title: "My Applications",
      desc: "View the status of your applied jobs.",
      to: "/my-applications",
      icon: <Send className="w-10 h-10 mb-3 text-purple-600" />,
    },
    ];
  } else {
    // Guest user (not logged in)
    cards = [
      {
        title: "Register Now",
        desc: "Create your free account as employer or applicant.",
        to: "/register",
        icon: <Users className="w-10 h-10 mb-3 text-indigo-600" />,
      },
      {
        title: "Browse Jobs",
        desc: "Explore listings before joining.",
        to: "/jobs",
        icon: <Briefcase className="w-10 h-10 mb-3 text-purple-600" />,
      },
    ];
  }

  return (
    <div className="bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-28 px-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-md bg-white/10 p-10 rounded-2xl max-w-3xl shadow-2xl border border-white/20"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
            Discover Your Dream Job
          </h1>
          <p className="mt-4 text-lg text-white/90">
            A smart platform where <span className="font-semibold">Talent</span> meets <span className="font-semibold">Opportunities</span>.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            {!authData?.token && (
              <Link
                to="/register"
                className="bg-white text-indigo-600 px-6 py-3 font-semibold rounded-full shadow hover:bg-gray-100 transition"
              >
                Get Started
              </Link>
            )}
            <Link
              to="/jobs"
              className="bg-indigo-700 text-white px-6 py-3 font-semibold rounded-full hover:bg-indigo-800 transition"
            >
              Browse Jobs
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Role-Based Cards Section */}
      <section className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white py-20 px-6 md:px-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          {role === "employer"
            ? "Welcome, Employer"
            : role === "applicant"
            ? "Opportunities Await You"
            : "Why Choose Us?"}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <Link
              to={card.to}
              key={i}
              className="transform hover:scale-[1.02] transition"
            >
              <motion.div
                whileHover={{ y: -5 }}
                className="p-8 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-md text-center hover:ring-2 hover:ring-indigo-500"
              >
                {card.icon}
                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                <p>{card.desc}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Banner – only for unauthenticated users */}
      {!authData?.token && (
        <section className="bg-indigo-700 py-16 px-6 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="mb-6">Join thousands of job seekers and employers today.</p>
          <Link
            to="/register"
            className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition"
          >
            Join Now
          </Link>
        </section>
      )}
    </div>
  );
};

export default Home;
