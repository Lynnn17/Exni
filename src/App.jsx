import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";
import Login from "./views/Login";
import Home from "./views/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/user/*" element={<UserRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
