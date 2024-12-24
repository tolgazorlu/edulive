import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className='h-screen'>
      <div className='hidden md:block absolute inset-0 h-full w-full bg-gray-900 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px] -z-10'>
        <div className='hidden md:block absolute inset-0 top-1/4 h-1/3 w-1/3 bg-gradient-to-br from-pink-500 to-yellow-500 blur-3xl opacity-10'></div>
        <div className='hidden md:block absolute top-2/4 right-0 h-1/3 w-1/3 bg-gradient-to-br from-teal-500 to-green-500 blur-3xl opacity-10'></div>
      </div>
      <Outlet />
    </div>
  );
};

export default HomeLayout;
