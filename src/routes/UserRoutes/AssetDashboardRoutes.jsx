import React from "react";
import { Routes, Route } from "react-router-dom";

import Sewa from "../../views/user/asset/sewa/Dashboard";
import SewaDetail from "../../views/user/asset/sewa/Detail";
import BuildingDashboard from "../../views/user/asset/building/Dashboard";
import PesanBuilding from "../../views/user/asset/building/Pesan";
import DetailBuilding from "../../views/user/asset/building/Detail";
import TenantDashboard from "../../views/user/asset/tenant/Dashboard";
import PesanTenant from "../../views/user/asset/tenant/Pesan";
import DetailTenant from "../../views/user/asset/tenant/Detail";
const AssetDashboardRoutes = () => (
  <Routes>
    <Route path="/sewa-asset" element={<Sewa />} />
    <Route path="/sewa-asset/detail/:id" element={<SewaDetail />} />
    <Route path="/building" element={<BuildingDashboard />} />
    <Route path="/building/pesan/:id" element={<PesanBuilding />} />
    <Route path="/building/detail/:id" element={<DetailBuilding />} />
    <Route path="/tenant" element={<TenantDashboard />} />
    <Route path="/tenant/pesan/:id" element={<PesanTenant />} />
    <Route path="/tenant/detail/:id" element={<DetailTenant />} />
  </Routes>
);

export default AssetDashboardRoutes;
