import { useSnapshot } from "valtio";
import { Store } from "../../api/Store";
import Loader from "./Loader";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
  const state = useSnapshot(Store);
  useEffect(() => {
    const token = localStorage.getItem("userData");
    if (token) {
      const parse = JSON.parse(token);
    }
  }, []);


  return (
    <div className="h-fit w-full text-center uppercase text-white">
      {state.loading && (
        <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 size-20">
          Admin
          <Loader />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
