// src/pages/StaffPage.jsx
import React, { useState } from 'react';

function StaffPage() {
  const [readyOrders, setReadyOrders] = useState([
    { orderId: 1, items: ['Chicken Meal', 'Fries'] },
    { orderId: 2, items: ['Fish Meal'] },
  ]);

  const markOrderAsServed = (orderId) => {
    console.log(`Order ${orderId} has been served.`);
    setReadyOrders((prevOrders) =>
      prevOrders.filter((order) => order.orderId !== orderId)
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-blue-600 text-white py-4">
        <h1 className="text-3xl font-bold text-center">Staff Dashboard</h1>
      </header>
      <main className="flex-grow container mx-auto p-4">
        {readyOrders.length === 0 ? (
          <h2 className="text-xl font-bold text-center">
            No orders ready to serve.
          </h2>
        ) : (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {readyOrders.map((order) => (
              <div
                key={order.orderId}
                className="border rounded-lg p-4 shadow bg-white"
              >
                <h2 className="text-2xl font-bold mb-4">
                  Order #{order.orderId}
                </h2>
                <ul className="space-y-2 mb-4">
                  {order.items.map((item, index) => (
                    <li key={index} className="text-lg">
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  className="w-full bg-green-600 text-white py-3 rounded-lg text-xl font-bold"
                  onClick={() => markOrderAsServed(order.orderId)}
                >
                  Mark as Served
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
      <footer className="bg-gray-200 text-center py-4">Al Baik ©2024</footer>
    </div>
  );
}

export default StaffPage;
