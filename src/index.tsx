import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { LocationProvider } from "./store/location.context";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <LocationProvider>
        <App />
      </LocationProvider>
    </BrowserRouter>
  </React.StrictMode>
);
