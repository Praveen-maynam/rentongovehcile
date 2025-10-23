import React from "react";

import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { LocationProvider } from "./store/location.context";

import { createRoot } from "react-dom/client";

import "./index.css";


const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <LocationProvider>
      <App />
    </LocationProvider>
  </BrowserRouter>
);
