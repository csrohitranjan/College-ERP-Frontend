import { Outlet } from "react-router-dom";
import DashboardUi from "./DashboardUi";
import DashboardHeader from "./DashboardHeader";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen">
      <DashboardHeader title={"Student Dashboard"} />
      <div className="flex h-[calc(100vh-64px)] bg-slate-800">
        <DashboardUi />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
