import { Link, useNavigate } from "react-router-dom";
import { Store } from "../../api/Store";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const AdminDashboardUi = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const deleteSession = useMutation({
    mutationKey: ["LOGOUT"],
    mutationFn: Store.logOut,
    onSuccess: (data) => {
      if (data) {
        navigate("/");
      }
    },
  });

  function logOutHandler() {
    deleteSession.mutate();
  }

  useEffect(() => {
    if (Store.toggleDialog) {
      console.log("dialog state is true");
    }
  }, []);

  return (
    <main className="flex border border-[#3b3f49] w-[300px] bg-slate-950 text-center">
      <div className="flex flex-col items-center justify-between px-3 py-2 rounded-md w-full">
        <div className="flex flex-col w-full gap-3">
          <Link className="w-full" to="/adminDashboard">
            <div className="hover:bg-[#1c2029] text-white h-[35px] rounded-md text-start flex gap-3 px-2 items-center">
              <img src="/assets/dashboard.svg" alt="#" />
              Dashboard
            </div>
          </Link>

          <div onClick={() => setOpen(!open)} className="cursor-pointer">
            <div className="text-white flex flex-col gap-3 items-start">
              <div className="flex gap-3 h-[35px] rounded-md items-center hover:bg-[#1c2029] w-full px-2 relative">
                <img src="/assets/Request.svg" alt="#" />
                Lors
                {!open ? (
                  <img
                    src="/assets/chevronDown.svg"
                    alt="#"
                    className="absolute top-2/4 right-1 -translate-y-2/4"
                  />
                ) : (
                  <img
                    src="/assets/chevronUp.svg"
                    alt="#"
                    className="absolute top-2/4 right-1 -translate-y-2/4"
                  />
                )}
              </div>

              <div
                className={`${open ? "block" : "hidden"
                  } px-2 hover:bg-[#1c2029] w-full rounded-md h-[35px] flex items-center `}
              >
                <Link
                  to="/adminDashboard/pendingLor"
                  className="flex gap-3 w-full"
                >
                  <img src="/assets/dot.svg" alt="#" />
                  Pending Lor
                </Link>
              </div>
              <div
                className={`${open ? "block" : "hidden"
                  } px-2 hover:bg-[#1c2029] w-full rounded-md h-[35px] flex items-center `}
              >
                <Link
                  to="/adminDashboard/approvedLor"
                  className="flex gap-3 w-full"
                >
                  <img src="/assets/dot.svg" alt="#" />
                  Approved Lor
                </Link>
              </div>

              <div
                className={`${open ? "block" : "hidden"
                  } px-2 hover:bg-[#1c2029] w-full rounded-md h-[35px] flex items-center `}
              >
                <Link
                  to="/adminDashboard/rejectedLor"
                  className="flex gap-3 w-full"
                >
                  <img src="/assets/dot.svg" alt="#" />
                  Rejected Lor
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <Link className="w-full" to="/adminDashboard/registerAdmin">
            <div className="hover:bg-[#1c2029] text-white h-[35px] rounded-md text-start flex gap-3 px-2 items-center">
              <img src="/assets/user.svg" alt="#" />
              Register Admin
            </div>
          </Link>
          <Link className="w-full" to="/adminDashboard/registerstudent">
            <div className="hover:bg-[#1c2029] text-white h-[35px] rounded-md text-start flex gap-3 px-2 items-center">
              <img src="/assets/Request.svg" alt="#" />
              Register Student
            </div>
          </Link>
          <Link className="w-full" to="/adminDashboard/profile">
            <div className="hover:bg-[#1c2029] text-white h-[35px] rounded-md text-start flex gap-3 px-2 items-center">
              <img src="/assets/user.svg" alt="#" /> Profile
            </div>
          </Link>
          <Link className="w-full" to="adminDashboard/changepassword">
            <div className="hover:bg-[#1c2029] text-white h-[35px] rounded-md text-start flex gap-3 px-2 items-center">
              <img src="/assets/password.svg" alt="#" />
              Change Password
            </div>
          </Link>
          <Link className="w-full" onClick={logOutHandler}>
            <div className="hover:bg-[#1c2029] text-white h-[35px] rounded-md text-start flex gap-3 px-2 items-center">
              <img src="/assets/logout.svg" alt="#" />
              Logout
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
};




export default AdminDashboardUi;
