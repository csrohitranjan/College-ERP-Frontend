import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "src/components/customComponents/Home";
import Login from "src/components/customComponents/Login";
import { Register } from "src/components/customComponents/Register";
import Layout from "./components/customComponents/Layout";
import StudentDashboard from "./components/customComponents/StudentDashboard";
import Profile from "./components/customComponents/Profile";
import DashboardLayout from "./components/customComponents/StudDashboardLayout";
import LorApplication from "./components/customComponents/LorApplication";
import ChangePassword from "components/customComponents/changePassword";
import AdminDashboard from "./components/customComponents/AdminDashboard";
import AdminDashboardLayout from "./components/customComponents/AdminDashboardLayout";
import PendingLor from "./components/customComponents/PendingLor";
import ApprovedLor from "./components/customComponents/ApprovedLors";
import RejectedLor from "./components/customComponents/RejectedLor";
import RegisterAdmin from "./components/customComponents/RegisterAdmin";
import ForgotPassword from "./components/customComponents/ForgotPassword";
import FindAndUpdateUserProfile from "./components/customComponents/FindAndUpdateUserProfile";
import AccessDeniedMessage from "./components/customComponents/AccessDeniedMessage";
import useMobileDetection from "./utils/useMobileDetection";
import MaintenancePage from "./components/customComponents/MaintenancePage";
import { getMaintenanceMode } from "./utils/maintenance" // It work as Switch


const App = () => {
  const isMaintenanceMode = getMaintenanceMode();

  // Conditionally render the maintenance page
  if (isMaintenanceMode) {
    return <MaintenancePage />;
  }

  // Mobile Detection Start
  const isMobile = useMobileDetection();

  if (isMobile) {
    return <AccessDeniedMessage />;
  }

  // Mobile Detction End 
  return (
    <Router>
      <Routes>
        {/* Redirect from root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* <Route path="/" element={<Home />} /> */}

        {/* Public Routes */}
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
        </Route>

        {/* Student Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/studDashboard" element={<StudentDashboard />} />
          <Route path="/studDashboard/lor" element={<LorApplication />} />
          <Route path="/studDashboard/profile" element={<Profile />} />
          <Route path="/studDashboard/changePassword" element={<ChangePassword />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminDashboardLayout />}>
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/adminDashboard/pendingLor" element={<PendingLor />} />
          <Route path="/adminDashboard/approvedLor" element={<ApprovedLor />} />
          <Route path="/adminDashboard/rejectedLor" element={<RejectedLor />} />
          <Route path="/adminDashboard/registerAdmin" element={<RegisterAdmin />} />
          <Route path="/adminDashboard/registerstudent" element={<Register />} />
          <Route path="/adminDashboard/searchUser" element={<FindAndUpdateUserProfile />} />
          <Route path="/adminDashboard/profile" element={<Profile />} />
          <Route path="/adminDashboard/changepassword" element={<ChangePassword />} />
        </Route>
      </Routes>
    </Router>
  );
};



export default App;
