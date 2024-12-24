import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import OCIDProvider from "./utils/OCIDProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <OCIDProvider>
        <RouterProvider router={routes} />
      </OCIDProvider>
    </ThemeProvider>
  </StrictMode>
);
