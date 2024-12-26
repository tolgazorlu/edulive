import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "./Layout/HomeLayout";
import CreateClass from "./pages/CreateClass";
import { LoginCallBack } from "@opencampus/ocid-connect-js";
import LiveClass from "./pages/LiveClass";
import HomePage from "./pages/Home";
import SettingsLayout from "./pages/Profile/ProfileLayout";

const onLoginSuccess = () => {
  console.log("success");
  setTimeout(() => {
    window.location.href = "/";
  }, 2000);
};

const onLoginError = () => {
  console.log("Error");
  setTimeout(() => {
    window.location.href = "/";
  }, 2000);
};

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/account",
        element: <SettingsLayout />,
      },
      {
        path: "/create-class",
        element: <CreateClass />,
      },
      {
        path: "/class/:slug",
        element: <LiveClass />,
      },
      {
        path: "/redirect",
        element: (
          <LoginCallBack
            successCallback={onLoginSuccess}
            errorCallback={onLoginError}
          />
        ),
      },
    ],
  },
]);
