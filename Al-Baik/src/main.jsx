// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css"; // Tailwind CSS import
import { OrderNumberProvider } from "./context/OrderNumberContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <OrderNumberProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </OrderNumberProvider>,
);
