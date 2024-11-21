import React from "react";
import { Routes, Route } from "react-router-dom";
import SewaAset from "../../views/user/asset/sewa/Dashboard";
import DetailSewaAset from "../../views/user/asset/sewa/Detail";
const AssetDashboardRoutes = () => (
  <Routes>
    <Route path="/sewa-aset" element={<SewaAset />} />
    <Route path="/sewa-aset/detail/:id" element={<DetailSewaAset />} />
  </Routes>
);

export default AssetDashboardRoutes;
