// Third party
import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "@/routes";
// Global assets
import "@/assets/styles";

const root = document.getElementById("root");

if (!root) {
  throw new Error("DOM root not found");
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
