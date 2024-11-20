import React from "react";
import { Routes, Route } from "react-router-dom";
import UsersAdmin from "../../views/admin/user/Dashboard";
import AddUser from "../../views/admin/user/Add";
import EditUser from "../../views/admin/user/Edit";

const UserDashboardRoutes = () => (
  <Routes>
    <Route path="/" element={<UsersAdmin />} />
    <Route path="/add" element={<AddUser />} />
    <Route path="/edit/:id" element={<EditUser />} />
  </Routes>
);

export default UserDashboardRoutes;
