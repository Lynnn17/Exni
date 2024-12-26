import React from "react";
import { Routes, Route } from "react-router-dom";
import SewaTenant from "../../views/user/asset/sewa/tenant/Dashboard";
import SewaTenantDetail from "../../views/user/asset/sewa/tenant/Dashboard";
import SewaBuilding from "../../views/user/asset/sewa/building/Dashboard";
import SewaBuildingDetail from "../../views/user/asset/sewa/building/Dashboard";
import BuildingDashboard from "../../views/user/asset/building/Dashboard";
import PesanBuilding from "../../views/user/asset/building/Pesan";
import DetailBuilding from "../../views/user/asset/building/Detail";
import TenantDashboard from "../../views/user/asset/tenant/Dashboard";
import PesanTenant from "../../views/user/asset/tenant/Pesan";
import DetailTenant from "../../views/user/asset/tenant/Detail";
const AssetDashboardRoutes = () => (
  <Routes>
    <Route path="/sewa-tenant" element={<SewaTenant />} />
    <Route path="/sewa-tenant/detail/:id" element={<SewaTenantDetail />} />
    <Route path="/sewa-building" element={<SewaBuilding />} />
    <Route path="/sewa-building/detail/:id" element={<SewaBuildingDetail />} />
    <Route path="/building" element={<BuildingDashboard />} />
    <Route path="/building/pesan/:id" element={<PesanBuilding />} />
    <Route path="/building/detail/:id" element={<DetailBuilding />} />
    <Route path="/tenant" element={<TenantDashboard />} />
    <Route path="/tenant/pesan/:id" element={<PesanTenant />} />
    <Route path="/tenant/detail/:id" element={<DetailTenant />} />
  </Routes>
);

export default AssetDashboardRoutes;
