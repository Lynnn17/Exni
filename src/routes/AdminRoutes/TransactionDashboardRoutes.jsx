import React from "react";
import { Routes, Route } from "react-router-dom";
import TransaksiDashboard from "../../views/admin/transaksi/Dashboard";
import TransaksiDetail from "../../views/admin/transaksi/Detail";
const UserDashboardRoutes = () => (
  <Routes>
    <Route path="/" element={<TransaksiDashboard />} />
    <Route path="/detail/:id" element={<TransaksiDetail />} />
  </Routes>
);

export default UserDashboardRoutes;
