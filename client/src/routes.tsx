import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "./Layout/HomeLayout";
import LandingPage from "./pages/Landing";
import JoinClass from "./pages/JoinClass";
import CreateClass from "./pages/CreateClass";
import { LoginCallBack } from "@opencampus/ocid-connect-js";
import LiveClass from "./pages/LiveClass";
import CreateUser from "./pages/CreateUser";

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
        element: <LandingPage />,
      },
      {
        path: "/create-user",
        element: <CreateUser />,
      },
      {
        path: "/join-class",
        element: <JoinClass />,
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
