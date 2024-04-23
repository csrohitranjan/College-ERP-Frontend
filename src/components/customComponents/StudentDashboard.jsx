import { useSnapshot } from "valtio";
import { Store } from "../../api/Store";
import Loader from "./Loader";

const StudentDashboard = () => {
  const state = useSnapshot(Store);
  return (
    <div className="h-fit w-full text-center uppercase text-white">
      {state.loading && (
        <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 size-20">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
