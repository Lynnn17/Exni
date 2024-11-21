import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardHome from "../views/user/Dashboard";
import AssetDashboardRoutes from "./UserRoutes/AssetDashboardRoutes";
import SubmissionDashboardRoutes from "./UserRoutes/SubmissionDashboardRoutes";
const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardHome />} />
      <Route path="/asset/*" element={<AssetDashboardRoutes />} />
      <Route path="/submission/*" element={<SubmissionDashboardRoutes />} />\
    </Routes>
  );
};

export default UserRoutes;
