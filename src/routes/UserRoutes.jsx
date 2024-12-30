import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardHome from "../views/user/Dashboard";
import AssetDashboardRoutes from "./UserRoutes/AssetDashboardRoutes";
import SubmissionDashboardRoutes from "./UserRoutes/SubmissionDashboardRoutes";

import ProtectedRoute from "../utils/protectedRoute"; // Import the ProtectedRoute

const UserRoutes = () => {
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={<ProtectedRoute element={DashboardHome} requiredRole="USER" />}
      />
      <Route
        path="/asset/*"
        element={
          <ProtectedRoute element={AssetDashboardRoutes} requiredRole="USER" />
        }
      />
      <Route
        path="/submission/*"
        element={
          <ProtectedRoute
            element={SubmissionDashboardRoutes}
            requiredRole="USER"
          />
        }
      />
      \
      <Route
        path="/transaction/*"
        element={
          <ProtectedRoute
            element={TransaksiDashboardRoutes}
            requiredRole="USER"
          />
        }
      />

import Notif from "../views/user/Notifikasi";
const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard/:id" element={<DashboardHome />} />
      <Route path="/asset/*" element={<AssetDashboardRoutes />} />
      <Route path="/submission/*" element={<SubmissionDashboardRoutes />} />
      <Route path="/transaction/*" element={<TransaksiDashboardRoutes />} />
      <Route path="/notifikasi/*" element={<Notif />} />

    </Routes>
  );
};

export default UserRoutes;
