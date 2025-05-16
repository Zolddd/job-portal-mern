import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Moon, Sun, Menu, X, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog } from "@headlessui/react";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { authData, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Jobs", path: "/jobs" },
  ];

  if (!authData?.token) {
    navLinks.push({ name: "Register", path: "/register" });
    navLinks.push({ name: "Login", path: "/login" });
  }

  const isActive = (path) => location.pathname === path;

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    logout();
    navigate("/login");
  };

  return (
      <div className="w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <header className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          JobPortal
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`${
                isActive(link.path)
                  ? "text-indigo-600 font-semibold underline underline-offset-4"
                  : "text-gray-700 dark:text-gray-300"
              } hover:text-indigo-600 dark:hover:text-white transition`}
            >
              {link.name}
            </Link>
          ))}

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:scale-110 transition"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Logout */}
          {authData?.token && (
            <button
              onClick={() => setShowLogoutModal(true)}
              className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition flex items-center gap-1"
              aria-label="Logout"
              title="Logout"
            >
              <LogOut size={18} />
              <span className="hidden md:inline">Logout</span>
            </button>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white dark:bg-gray-900 px-4 pb-4 pt-2 space-y-2 shadow"
          >
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block px-2 py-1 rounded ${
                    isActive(link.path)
                      ? "text-indigo-600 font-semibold underline underline-offset-4"
                      : "text-gray-700 dark:text-gray-300"
                  } hover:text-indigo-600 dark:hover:text-white transition`}
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
              {authData?.token && (
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <Dialog
            as={motion.div}
            static
            open={showLogoutModal}
            onClose={() => setShowLogoutModal(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-sm w-full p-6 backdrop-blur-md border border-gray-200 dark:border-gray-700"
            >
              <Dialog.Title className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Confirm Logout
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Are you sure you want to logout? You’ll be signed out of your session.
              </Dialog.Description>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogoutConfirm}
                  className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition font-semibold"
                >
                  Yes, Logout
                </button>
              </div>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
