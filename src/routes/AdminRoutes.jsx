import React from "react";
import { Routes, Route } from "react-router-dom";
import Notif from "../views/admin/Notifikasi";
import DashboardAdmin from "../views/admin/Dashboard";
import UserDashboardRoutes from "./AdminRoutes/UserDashboardRoutes";
import AssetDashboardRoutes from "./AdminRoutes/AssetDashboardRoutes";
import SubmissionDashboardRoutes from "./AdminRoutes/SubmissionDashboardRoutes";
import TransaksiDashboardRoutes from "./AdminRoutes/TransactionDashboardRoutes";
import Login from "../views/admin/Login";
import ProtectedRoute from "../utils/protectedRoute"; // Import the ProtectedRoute

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute element={DashboardAdmin} requiredRole="ADMIN" />
        }
      />
      <Route
        path="/user/*"
        element={
          <ProtectedRoute element={UserDashboardRoutes} requiredRole="ADMIN" />
        }
      />
      <Route
        path="/asset/*"
        element={
          <ProtectedRoute element={AssetDashboardRoutes} requiredRole="ADMIN" />
        }
      />
      <Route
        path="/submission/*"
        element={
          <ProtectedRoute
            element={SubmissionDashboardRoutes}
            requiredRole="ADMIN"
          />
        }
      />
      <Route
        path="/transaction/*"
        element={
          <ProtectedRoute
            element={TransaksiDashboardRoutes}
            requiredRole="ADMIN"
          />
        }
      />

      <Route path="/dashboard" element={<DashboardAdmin />} />
      <Route path="/notifikasi" element={<Notif />} />
      <Route path="/user/*" element={<UserDashboardRoutes />} />
      <Route path="/asset/*" element={<AssetDashboardRoutes />} />
      <Route path="/submission/*" element={<SubmissionDashboardRoutes />} />
      <Route path="/transaction/*" element={<TransaksiDashboardRoutes />} />

    </Routes>
  );
};

export default AdminRoutes;
