import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Landing from "../pages/Landing";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import LearnerDashboard from "../pages/learner/Dashboard";
import TutorDashboard from "../pages/tutor/Dashboard";
import AdminDashboard from "../pages/admin/Dashboard";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Landing initialAuth="login" />} />
      <Route path="/register" element={<Landing initialAuth="register" />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route
        path="/learner/dashboard"
        element={
          <ProtectedRoute allowedRoles={["learner"]}>
            <LearnerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tutor/dashboard"
        element={
          <ProtectedRoute allowedRoles={["tutor"]}>
            <TutorDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
