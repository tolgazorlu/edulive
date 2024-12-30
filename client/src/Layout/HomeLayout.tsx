import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const HomeLayout = () => {
  return <>
  <Toaster />
  <Outlet />
  </>
};

export default HomeLayout;
