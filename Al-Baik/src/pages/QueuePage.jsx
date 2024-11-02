// src/pages/QueuePage.jsx
import React, { useEffect, useState } from 'react';

function QueuePage() {
  const [orders, setOrders] = useState([
    { orderId: 101, status: 'Preparing' },
    { orderId: 102, status: 'Ready' },
    { orderId: 103, status: 'Preparing' },
    { orderId: 104, status: 'Ready' },
    { orderId: 105, status: 'Preparing' },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.status === 'Preparing' && Math.random() > 0.7
            ? { ...order, status: 'Ready' }
            : order
        )
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const preparingOrders = orders.filter(
    (order) => order.status === 'Preparing'
  );
  const readyOrders = orders.filter((order) => order.status === 'Ready');

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-green-600 text-white py-4">
        <h1 className="text-3xl font-bold text-center">Order Status</h1>
      </header>
      <main className="flex-grow container mx-auto p-4">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-center">
              Preparing Orders
            </h2>
            <ul className="space-y-2">
              {preparingOrders.map((order) => (
                <li
                  key={order.orderId}
                  className="border rounded p-2 text-center bg-yellow-100"
                >
                  Order #{order.orderId}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2 text-center">
              Ready Orders
            </h2>
            <ul className="space-y-2">
              {readyOrders.map((order) => (
                <li
                  key={order.orderId}
                  className="border rounded p-2 text-center bg-green-100"
                >
                  Order #{order.orderId}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <footer className="bg-gray-200 text-center py-4">Al Baik ©2024</footer>
    </div>
  );
}

export default QueuePage;
