import { Outlet } from "react-router-dom";
import { Header } from "src/components/customComponents/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
