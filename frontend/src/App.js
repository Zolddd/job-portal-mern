import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Jobs from "./pages/Jobs"; // You will create Jobs page
import EmployerDashboard from "./pages/EmployerDashboard"; // Placeholder, create later
import ApplyJob from "./pages/ApplyJob";
import Applications from "./pages/Applications";
import CreateJob from "./pages/CreateJob";
import MyApplications from "./pages/MyApplications";

// Example AuthContext import and usage (you need to implement this)
import { AuthProvider, useAuth } from "./context/AuthContext";

// Simple Protected Route component
const ProtectedRoute = ({ children, roles }) => {
  const { authData } = useAuth();

  if (!authData?.token) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(authData.user.role)) {
    // Role not authorized
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />

              <Route
                path="/jobs"
                element={
                  <ProtectedRoute roles={["applicant", "employer"]}>
                    <Jobs />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/employer/dashboard"
                element={
                  <ProtectedRoute roles={["employer"]}>
                    <EmployerDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/jobs/:id/apply"
                element={
                  <ProtectedRoute roles={["applicant"]}>
                    <ApplyJob />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/applications"
                element={
                  <ProtectedRoute roles={["employer"]}>
                    <Applications />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-job"
                element={
                  <ProtectedRoute roles={["employer"]}>
                    <CreateJob />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-applications"
                element={
                  <ProtectedRoute roles={["applicant"]}>
                    <MyApplications />
                  </ProtectedRoute>
                }
              />

              {/* 404 fallback */}
              <Route path="*" element={<h1 className="text-center mt-20">404 - Page Not Found</h1>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
