import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import OCIDProvider from "./utils/OCIDProvider";
import { StreamTheme } from "@stream-io/video-react-sdk";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

import { ThemeProvider } from "@/components/theme-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <OCIDProvider>
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
          <StreamTheme style={{ fontFamily: "sans-serif" }}>
            <RouterProvider router={routes} />
          </StreamTheme>
        </ThemeProvider>
      </OCIDProvider>
    </QueryClientProvider>
  </StrictMode>
);
