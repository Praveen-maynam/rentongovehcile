import React from "react";
<<<<<<< HEAD
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { LocationProvider } from "./store/location.context";
=======
import { createRoot } from "react-dom/client";
>>>>>>> 5143d53b872239f2b8b29a029570844a7fea5f48
import "./index.css";
import App from "./App";

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(
  <React.StrictMode>
<<<<<<< HEAD
    <BrowserRouter>
      <LocationProvider>
        <App />
      </LocationProvider>
    </BrowserRouter>
=======
    <App />
>>>>>>> 5143d53b872239f2b8b29a029570844a7fea5f48
  </React.StrictMode>
);
