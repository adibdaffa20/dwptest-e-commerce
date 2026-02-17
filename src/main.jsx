import React from "react";
import ReactDOM from "react-dom/client";
import Providers from "./app/providers";
import App from "./app/App";
import CssBaseline from "@mui/material/CssBaseline";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error('Root element #root not found');

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <Providers>
      <CssBaseline />
      <App />
    </Providers>
  </React.StrictMode>
);
