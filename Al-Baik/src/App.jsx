// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import OrderPage from './pages/OrderPage';
import KitchenPage from './pages/KitchenPage';
import StaffPage from './pages/StaffPage';
import QueuePage from './pages/QueuePage';
import NotFoundPage from './pages/NotFoundPage';
import ReceiptPage from './pages/ReceiptPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<OrderPage />} />
      <Route path="/kitchen" element={<KitchenPage />} />
      <Route path="/staff" element={<StaffPage />} />
      <Route path="/queue" element={<QueuePage />} />
      <Route path="/receipt" element={<ReceiptPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
