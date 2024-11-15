import React from "react";
import { Routes, Route } from "react-router-dom";
import PengajuanDashboard from "../../views/admin/pengajuan/Dashboard";
import DetailPengajuan from "../../views/admin/pengajuan/Detail";

const UserDashboardRoutes = () => (
  <Routes>
    <Route path="/" element={<PengajuanDashboard />} />
    <Route path="/detail/:id" element={<DetailPengajuan />} />
  </Routes>
);

export default UserDashboardRoutes;
