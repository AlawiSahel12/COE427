// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import OrderPage from './pages/OrderPage';
import KitchenPage from './pages/KitchenPage';
import StaffPage from './pages/StaffPage';
import QueuePage from './pages/QueuePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<OrderPage />} /> {/* Order/Cashier Page */}
      <Route path="/kitchen" element={<KitchenPage />} /> {/* Kitchen Page */}
      <Route path="/staff" element={<StaffPage />} /> {/* Staff Page */}
      <Route path="/queue" element={<QueuePage />} />{' '}
      {/* Waiting Queue Screen */}
      <Route path="*" element={<NotFoundPage />} />{' '}
      {/* Catch-all for undefined routes */}
    </Routes>
  );
}

export default App;
