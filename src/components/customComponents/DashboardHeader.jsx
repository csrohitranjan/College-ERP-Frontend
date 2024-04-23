import PropTypes from "prop-types";

const DashboardHeader = ({ title }) => {
  const storedDataString = localStorage.getItem("userData");
  const userDataObject = JSON.parse(storedDataString);

  const firstName = userDataObject.data.user.fullName;
  const secondName = userDataObject.data.user.fatherName;

  return (
    <header
      className="flex items-center h-16 px-4 border-b border-slate-300/60 shrink-0 md:px-6 bg-slate-950 text-white"
      id="header"
    >
      <div className="flex justify-between items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4 h-full">
        <h1 className="font-bold">{title}</h1>

        <div className="flex items-center gap-4 border-l border-gray-500 h-full pl-5">
          <div className="size-10 bg-blue-950 text-white flex justify-center items-center text-center border border-gray-300/70 uppercase rounded-full">
            {`${firstName[0]} ${secondName[0]}`}
          </div>

          <div className="text-white uppercase text-center">{firstName}</div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

DashboardHeader.propTypes = {
  title: PropTypes.string,
};
