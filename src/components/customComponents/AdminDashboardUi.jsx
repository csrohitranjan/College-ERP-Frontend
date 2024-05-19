import { Link, useNavigate } from "react-router-dom";
import { Store } from "../../api/Store";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faEnvelope,
  faUserPlus,
  faUserGraduate,
  faUser,
  faSearch,
  faLock,
  faRightFromBracket,
  faChevronDown,
  faChevronUp,
  faClock,
  faCheck,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

const AdminDashboardUi = () => {
  const navigate = useNavigate();
  const [openLORs, setOpenLORs] = useState(false);

  const { mutate: logout } = useMutation({
    mutationKey: ["LOGOUT"],
    mutationFn: Store.logOut,
    onSuccess: (data) => {
      if (data) {
        navigate("/");
      }
    },
  });

  const logOutHandler = () => {
    logout();
  };

  useEffect(() => {
    if (Store.toggleDialog) {
      console.log("dialog state is true");
    }
  }, []);

  return (
    <main className="flex border border-[#3b3f49] w-[300px] bg-slate-950 text-center">
      <div className="flex flex-col items-center justify-between px-3 py-2 rounded-md w-full">
        <div className="flex flex-col w-full gap-3">
          <NavItem to="/adminDashboard" icon={faHome} label="Dashboard" />

          <NavGroup
            label="LORs"
            icon={faEnvelope}
            isOpen={openLORs}
            toggleOpen={() => setOpenLORs(!openLORs)}
          >
            <NavItem to="/adminDashboard/pendingLor" icon={faClock} label="Pending LOR" />
            <NavItem to="/adminDashboard/approvedLor" icon={faCheck} label="Approved LOR" />
            <NavItem to="/adminDashboard/rejectedLor" icon={faTimes} label="Rejected LOR" />
          </NavGroup>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <NavItem to="/adminDashboard/registerAdmin" icon={faUserPlus} label="Register Admin" />
          <NavItem to="/adminDashboard/registerstudent" icon={faUserGraduate} label="Register Student" />
          <NavItem to="/adminDashboard/searchUser" icon={faSearch} label="Search User" />
          <NavItem to="/adminDashboard/profile" icon={faUser} label="Profile" />
          <NavItem to="/adminDashboard/changepassword" icon={faLock} label="Change Password" />
          <NavItem to="/" icon={faRightFromBracket} label="Logout" onClick={logOutHandler} />
        </div>
      </div>
    </main>
  );
};

const NavItem = ({ to, icon, label, onClick }) => (
  <Link to={to} onClick={onClick} className="w-full">
    <div className="hover:bg-[#1c2029] text-white h-[35px] rounded-md text-start flex gap-3 px-2 items-center">
      <FontAwesomeIcon icon={icon} />
      <span className="ml-2">{label}</span>
    </div>
  </Link>
);

const NavGroup = ({ label, icon, isOpen, toggleOpen, children }) => (
  <div className="w-full">
    <div className="flex gap-3 h-[35px] rounded-md items-center hover:bg-[#1c2029] w-full px-2 relative cursor-pointer" onClick={toggleOpen} aria-expanded={isOpen}>
      <FontAwesomeIcon icon={icon} />
      <span className="ml-2">{label}</span>
      <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} className="absolute top-2/4 right-1 -translate-y-2/4" />
    </div>
    {isOpen && <div className="flex flex-col w-full">{children}</div>}
  </div>
);





export default AdminDashboardUi;
