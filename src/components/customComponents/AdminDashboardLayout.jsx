import { Outlet } from "react-router-dom";
import AdminDashboardUi from "./AdminDashboardUi";
import DashboardHeader from "./DashboardHeader";

const AdminDashboardLayout = () => {
  return (
    <div className="min-h-screen">
      <DashboardHeader title={"Admin Dashboard"} />
      <div className="flex h-[calc(100vh-64px)] bg-slate-800">
        <AdminDashboardUi />
        <Outlet />
      </div>
    </div>
  );
};



export default AdminDashboardLayout;
