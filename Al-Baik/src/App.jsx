// src/App.jsx
import MealsPage from "./pages/KitchenPage-meal";
import SandwichesPage from "./pages/KitchenPage-Sandwich";
import React from "react";
import { Routes, Route } from "react-router-dom";
import OrderPage from "./pages/OrderPage";
import KitchenPage from "./pages/KitchenPage";
import StaffPage from "./pages/StaffPage";
import QueuePage from "./pages/QueuePage";
import NotFoundPage from "./pages/NotFoundPage";
import ReceiptPage from "./pages/ReceiptPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<OrderPage />} />
      <Route path="/meal" element={<MealsPage />} />
      <Route path="/sandwich" element={<SandwichesPage />} />
      <Route path="/staff" element={<StaffPage />} />
      <Route path="/queue" element={<QueuePage />} />
      <Route path="/receipt" element={<ReceiptPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
