import React from "react";
import { Routes, Route } from "react-router-dom";
import SubmissionDashboard from "../../views/user/pengajuan/Dashboard";
import SubmissionDetail from "../../views/user/pengajuan/Detail";

const SubmissionDashboardRoutes = () => (
  <Routes>
    <Route path="/" element={<SubmissionDashboard />} />
    <Route path="/detail/:id" element={<SubmissionDetail />} />
  </Routes>
);

export default SubmissionDashboardRoutes;
