import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { DialogProvider } from "./components/dialog/context.tsx";
import { ToastProvider } from "./components/toast/context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DialogProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </DialogProvider>
  </StrictMode>
);
