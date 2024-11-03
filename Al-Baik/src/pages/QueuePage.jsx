// src/pages/QueuePage.jsx
import React, { useEffect, useState } from "react";

function QueuePage() {
  const [orders, setOrders] = useState([
    { orderId: 101, status: "Waiting" },
    { orderId: 102, status: "Preparing" },
    { orderId: 103, status: "Ready" },
    // ...more orders
  ]);

  // Simulate real-time updates (for demonstration purposes)
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((prevOrders) =>
        prevOrders.map((order) => {
          if (order.status === "Waiting") {
            return { ...order, status: "Preparing" };
          } else if (order.status === "Preparing") {
            return { ...order, status: "Ready" };
          } else {
            return order;
          }
        }),
      );
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const waitingOrders = orders.filter((order) => order.status === "Waiting");
  const preparingOrders = orders.filter(
    (order) => order.status === "Preparing",
  );
  const readyOrders = orders.filter((order) => order.status === "Ready");

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-green-600 text-white py-4">
        <h1 className="text-3xl font-bold text-center">Order Status</h1>
      </header>
      <main className="flex-grow container mx-auto p-4">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
          {/* Waiting Orders */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">
              Waiting Orders
            </h2>
            <div className="grid gap-4">
              {waitingOrders.length === 0 ? (
                <p className="text-center text-lg">No orders are waiting.</p>
              ) : (
                waitingOrders.map((order) => (
                  <div
                    key={order.orderId}
                    className="bg-gray-200 rounded-lg py-4 text-center text-2xl font-bold"
                  >
                    Order #{order.orderId}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Preparing Orders */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">
              Preparing Orders
            </h2>
            <div className="grid gap-4">
              {preparingOrders.length === 0 ? (
                <p className="text-center text-lg">
                  No orders are being prepared.
                </p>
              ) : (
                preparingOrders.map((order) => (
                  <div
                    key={order.orderId}
                    className="bg-yellow-200 rounded-lg py-4 text-center text-2xl font-bold"
                  >
                    Order #{order.orderId}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Ready Orders */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">
              Ready Orders
            </h2>
            <div className="grid gap-4">
              {readyOrders.length === 0 ? (
                <p className="text-center text-lg">No orders are ready.</p>
              ) : (
                readyOrders.map((order) => (
                  <div
                    key={order.orderId}
                    className="bg-green-200 rounded-lg py-4 text-center text-2xl font-bold"
                  >
                    Order #{order.orderId}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-gray-200 text-center py-4">Al Baik ©2024</footer>
    </div>
  );
}

export default QueuePage;
