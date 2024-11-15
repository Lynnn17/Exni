import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardAdmin from "./views/admin/Dashboard";
import UsersAdmin from "./views/admin/user/Dashboard";
import AddUser from "./views/admin/user/Add";
import EditUser from "./views/admin/user/Edit";
import BuildingAdmin from "./views/admin/building/Dashboard";
import TenantAdmin from "./views/admin/tenant/Dashboard";
import VehicleAdmin from "./views/admin/vehicle/Dashboard";
import PengajuanAdmin from "./views/admin/pengajuan/Dashboard";
import AddBuilding from "./views/admin/building/Add";
import EditBuilding from "./views/admin/building/Edit";
import DetailPengajuan from "./views/admin/pengajuan/Detail";
import AddTenant from "./views/admin/tenant/Add";
import EditTenant from "./views/admin/tenant/Edit";
import AddVehicle from "./views/admin/vehicle/Add";
import EditVehicle from "./views/admin/vehicle/Edit";
import TransaksiAdmin from "./views/admin/transaksi/Dashboard";
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
          <Route path="/sewa" element={<sewaAdmin />} />
          {/* building */}
          <Route path="/buildings" element={<BuildingAdmin />} />
          <Route path="/buildings/add" element={<AddBuilding />} />
          <Route path="/buildings/edit/:id" element={<EditBuilding />} />
          {/* end building */}
          {/* Tenant */}
          <Route path="/tenants" element={<TenantAdmin />} />
          <Route path="/tenants/add" element={<AddTenant />} />
          <Route path="/tenants/edit/:id" element={<EditTenant />} />
          {/* end tenant */}

          <Route path="/vehicles" element={<VehicleAdmin />} />
          <Route path="/vehicles/add" element={<AddVehicle />} />
          <Route path="/vehicles/edit/:id" element={<EditVehicle />} />

          {/* pengajuan */}
          <Route path="/submissions" element={<PengajuanAdmin />} />
          <Route path="/submissions/detail/:id" element={<DetailPengajuan />} />
          {/* end pengajuan */}

          {/* transaksi */}
          <Route path="/transactions" element={<TransaksiAdmin />} />
          {/* end transaksi */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
