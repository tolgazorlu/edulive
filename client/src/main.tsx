import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import OCIDProvider from "./utils/OCIDProvider";
import { StreamTheme } from "@stream-io/video-react-sdk";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <OCIDProvider>
          <StreamTheme style={{ fontFamily: "sans-serif", color: "white" }}>
            <RouterProvider router={routes} />
          </StreamTheme>
        </OCIDProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
