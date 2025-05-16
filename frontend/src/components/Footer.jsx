import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const year = new Date().getFullYear();

  const links = [
    { name: "Home", path: "/" },
    { name: "Jobs", path: "/jobs" },
    { name: "Register", path: "/register" },
    { name: "Login", path: "/login" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/70 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-700"
    >
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8 text-center md:text-left text-gray-700 dark:text-gray-300">
        {/* Brand */}
        <div>
          <Link to="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            JobPortal
          </Link>
          <p className="mt-2 text-sm">Find jobs or hire talent fast and efficiently.</p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="hover:text-indigo-600 dark:hover:text-white transition"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Copyright */}
        <div className="flex flex-col justify-center items-center md:items-end text-sm">
          <p>© {year} JobPortal</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Crafted with 💻 + ❤️</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
