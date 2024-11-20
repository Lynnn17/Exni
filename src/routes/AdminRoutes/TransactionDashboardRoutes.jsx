import React from "react";
import { Routes, Route } from "react-router-dom";
import TransaksiDashboard from "../../views/admin/transaksi/Dashboard";

const UserDashboardRoutes = () => (
  <Routes>
    <Route path="/" element={<TransaksiDashboard />} />
  </Routes>
);

export default UserDashboardRoutes;
