import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardAdmin from "./views/admin/Dashboard";
import UsersAdmin from "./views/admin/User";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardAdmin />} />
          <Route path="/users" element={<UsersAdmin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
