import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardHome from "../views/user/Dashboard";
import AssetDashboardRoutes from "./UserRoutes/AssetDashboardRoutes";
import SubmissionDashboardRoutes from "./UserRoutes/SubmissionDashboardRoutes";
import TransaksiDashboardRoutes from "./UserRoutes/TransactionDashboardRoutes";
const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard/:id" element={<DashboardHome />} />
      <Route path="/asset/*" element={<AssetDashboardRoutes />} />
      <Route path="/submission/*" element={<SubmissionDashboardRoutes />} />\
      <Route path="/transaction/*" element={<TransaksiDashboardRoutes />} />
    </Routes>
  );
};

export default UserRoutes;
