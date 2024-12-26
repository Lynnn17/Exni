import React from "react";
import { Routes, Route } from "react-router-dom";
import SewaTenant from "../../views/admin/asset/sewa/tenant/Dashboard";
import SewaTenantDetail from "../../views/admin/asset/sewa/tenant/Detail";
import SewaBuilding from "../../views/admin/asset/sewa/building/Dashboard";
import SewaBuildingDetail from "../../views/admin/asset/sewa/building/Detail";
import BuildingDashboard from "../../views/admin/asset/building/Dashboard";
import AddBulding from "../../views/admin/asset/building/Add";
import EditBuilding from "../../views/admin/asset/building/Edit";
import TenantDashboard from "../../views/admin/asset/tenant/Dashboard";
import AddTenant from "../../views/admin/asset/tenant/Add";
import EditTenant from "../../views/admin/asset/tenant/Edit";
import Vehicle from "../../views/admin/asset/vehicle/Dashboard";
import AddVehicle from "../../views/admin/asset/vehicle/Add";
import EditVehicle from "../../views/admin/asset/vehicle/Edit";

const AssetDashboardRoutes = () => (
  <Routes>
    <Route path="/sewa-tenant" element={<SewaTenant />} />
    <Route path="/sewa-tenant/detail/:id" element={<SewaTenantDetail />} />
    <Route path="/sewa-building" element={<SewaBuilding />} />
    <Route path="/sewa-building/detail/:id" element={<SewaBuildingDetail />} />
    <Route path="/building" element={<BuildingDashboard />} />
    <Route path="/building/add" element={<AddBulding />} />
    <Route path="/building/edit/:id" element={<EditBuilding />} />
    <Route path="/tenant" element={<TenantDashboard />} />
    <Route path="/tenant/add" element={<AddTenant />} />
    <Route path="/tenant/edit/:id" element={<EditTenant />} />
    <Route path="/vehicle" element={<Vehicle />} />
    <Route path="/vehicle/add" element={<AddVehicle />} />
    <Route path="/vehicle/edit/:id" element={<EditVehicle />} />
  </Routes>
);

export default AssetDashboardRoutes;
