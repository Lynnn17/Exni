import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardAdmin from "./views/admin/Dashboard";
import UsersAdmin from "./views/admin/user/Dashboard";
import AssetAdmin from "./views/admin/asset/Dashboard";
import AddUser from "./views/admin/user/Add";
import EditUser from "./views/admin/user/Edit";
import BuildingAdmin from "./views/admin/building/Dashboard";
import TenantAdmin from "./views/admin/tenant/Dashboard";
import VehicleAdmin from "./views/admin/vehicle/Dashboard";
import PengajuanAdmin from "./views/admin/pengajuan/Dashboard";
import AddBuilding from "./views/admin/building/Add";
import EditBuilding from "./views/admin/building/Edit";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardAdmin />} />
          {/* User */}
          <Route path="/users" element={<UsersAdmin />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          {/* end user */}
          <Route path="/assets" element={<AssetAdmin />} />
          {/* building */}
          <Route path="/buildings" element={<BuildingAdmin />} />
          <Route path="/buildings/add" element={<AddBuilding />} />
          <Route path="/buildings/edit/:id" element={<EditBuilding />} />
          {/* end building */}
          <Route path="/tenants" element={<TenantAdmin />} />
          <Route path="/vehicles" element={<VehicleAdmin />} />
          <Route path="/submissions" element={<PengajuanAdmin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
