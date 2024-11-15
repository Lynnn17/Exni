import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardHome from "../views/user/Dashboard";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardHome />} />
    </Routes>
  );
};

export default UserRoutes;
