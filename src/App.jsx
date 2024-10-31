import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardAdmin from "./views/admin/Dashboard";
import UsersAdmin from "./views/admin/user/Dashboard";
import AssetAdmin from "./views/admin/asset/Dashboard";
import AddUser from "./views/admin/user/Add";
import EditUser from "./views/admin/user/Edit";
import BuildingAdmin from "./views/admin/building/Dashboard";
import TenantAdmin from "./views/admin/tenant/Dashboard";
import VehicleAdmin from "./views/admin/vehicle/Dashboard";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardAdmin />} />
          <Route path="/users" element={<UsersAdmin />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit" element={<EditUser />} />
          <Route path="/assets" element={<AssetAdmin />} />
          <Route path="/buildings" element={<BuildingAdmin />} />
          <Route path="/tenants" element={<TenantAdmin />} />
          <Route path="/vehicles" element={<VehicleAdmin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
