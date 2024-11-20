import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardAdmin from "../views/admin/Dashboard";
import UserDashboardRoutes from "./AdminRoutes/UserDashboardRoutes";
import AssetDashboardRoutes from "./AdminRoutes/AssetDashboardRoutes";
import SubmissionDashboardRoutes from "./AdminRoutes/SubmissionDashboardRoutes";
import TransaksiDashboardRoutes from "./AdminRoutes/TransactionDashboardRoutes";
const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardAdmin />} />
      <Route path="/user/*" element={<UserDashboardRoutes />} />
      <Route path="/asset/*" element={<AssetDashboardRoutes />} />
      <Route path="/submission/*" element={<SubmissionDashboardRoutes />} />
      <Route path="/transaction/*" element={<TransaksiDashboardRoutes />} />
    </Routes>
  );
};

export default AdminRoutes;
