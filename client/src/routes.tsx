import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "./Layout/HomeLayout";
import LandingPage from "./pages/Landing";
import JoinClass from "./pages/JoinClass";
import CreateClass from "./pages/CreateClass";
import { LoginCallBack } from "@opencampus/ocid-connect-js";

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
        path: "/join-class",
        element: <JoinClass />,
      },
      {
        path: "/create-class",
        element: <CreateClass />,
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
