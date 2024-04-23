import Home from "src/components/customComponents/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Student Routes */}

          <Route element={<DashboardLayout />}>
            <Route path="/studDashboard" element={<StudentDashboard />} />
            <Route path="/studDashboard/lor" element={<LorApplication />} />
            <Route path="/studDashboard/profile" element={<Profile />} />
            <Route
              path="/studDashboard/changePassword"
              element={<ChangePassword />}
            />
          </Route>

          {/* Admin Routes */}

          <Route element={<AdminDashboardLayout />}>
            <Route path="/adminDashboard" element={<AdminDashboard />} />
            <Route path="/adminDashboard/pendingLor" element={<PendingLor />} />
            <Route
              path="/adminDashboard/approvedLor"
              element={<ApprovedLor />}
            />
            <Route
              path="/adminDashboard/rejectedLor"
              element={<RejectedLor />}
            />

            <Route
              path="/adminDashboard/registerAdmin"
              element={<RegisterAdmin />}
            />

            <Route
              path="/adminDashboard/registerstudent"
              element={<Register />}
            />

            <Route path="/adminDashboard/profile" element={<Profile />} />

            <Route
              path="/adminDashboard/changepassword"
              element={<ChangePassword />}
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
