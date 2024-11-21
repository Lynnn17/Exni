import React from "react";
import { Routes, Route } from "react-router-dom";
import SubmissionDashboard from "../../views/user/pengajuan/Dashboard";
const SubmissionDashboardRoutes = () => (
  <Routes>
    <Route path="/" element={<SubmissionDashboard />} />
  </Routes>
);

export default SubmissionDashboardRoutes;
