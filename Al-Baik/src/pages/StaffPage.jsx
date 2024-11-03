// src/pages/StaffPage.jsx
import React, { useState } from "react";

function StaffPage() {
  const [orders, setOrders] = useState([
    { orderId: 101, items: ["Chicken Meal", "Fries"], status: "Waiting" },
    { orderId: 102, items: ["Fish Meal"], status: "Waiting" },
    // ...more orders
  ]);

  const [servedOrders, setServedOrders] = useState([]);
  const [resetMode, setResetMode] = useState(false);

  const handleOrderClick = (order) => {
    if (resetMode) {
      resetOrder(order);
      setResetMode(false);
    } else {
      // Transition from "Waiting" to "Served"
      if (order.status === "Waiting") {
        markOrderAsServed(order.orderId);
      }
    }
  };

  const markOrderAsServed = (orderId) => {
    const servedOrder = orders.find((order) => order.orderId === orderId);
    if (servedOrder) {
      setServedOrders((prevServed) => {
        const updatedServed = [servedOrder, ...prevServed];
        // Keep only the last 10 orders
        if (updatedServed.length > 10) {
          updatedServed.pop(); // Remove the oldest order
        }
        return updatedServed;
      });
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.orderId !== orderId),
      );
    }
  };

  const resetOrder = (order) => {
    if (servedOrders.find((o) => o.orderId === order.orderId)) {
      // Order is in servedOrders
      // Remove from servedOrders
      setServedOrders((prevServed) =>
        prevServed.filter((o) => o.orderId !== order.orderId),
      );
      // Add back to orders with status 'Waiting'
      setOrders((prevOrders) => [
        ...prevOrders,
        { ...order, status: "Waiting" },
      ]);
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "Waiting":
        return "border-gray-500 bg-gray-100";
      case "Served":
        return "border-green-500 bg-green-100";
      default:
        return "border-gray-500 bg-gray-100";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "Waiting":
        return "Mark as Served";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-blue-600 text-white py-4 flex justify-between items-center px-4">
        <h1 className="text-3xl font-bold text-center flex-grow">
          Staff Dashboard
        </h1>
        <button
          className={`text-white font-bold py-2 px-4 rounded ${
            resetMode ? "bg-red-700" : "bg-red-500"
          }`}
          onClick={() => setResetMode(!resetMode)}
        >
          {resetMode ? "Cancel Reset" : "Reset Order"}
        </button>
      </header>
      <main className="flex-grow container mx-auto p-4 overflow-y-auto">
        {orders.length === 0 ? (
          <h2 className="text-xl font-bold text-center">
            No orders in progress.
          </h2>
        ) : (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {orders.map((order) => (
              <div
                key={order.orderId}
                className={`border-4 rounded-lg p-4 shadow ${
                  resetMode ? "border-red-500" : getStatusStyles(order.status)
                }`}
              >
                <h2 className="text-2xl font-bold mb-2">
                  Order #{order.orderId}
                </h2>
                <p
                  className={`text-lg font-semibold mb-2 ${
                    order.status === "Waiting"
                      ? "text-gray-700"
                      : "text-green-700"
                  }`}
                >
                  Status: {order.status}
                </p>
                <ul className="space-y-1 mb-4">
                  {order.items.map((item, index) => (
                    <li key={index} className="text-lg">
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-2">
                  <button
                    className="w-full bg-yellow-300 text-white py-3 rounded-lg text-xl font-bold"
                    // onClick={() => markOrderAsServed(order.orderId)}
                  >
                    Mark as Ready
                  </button>
                  <button
                    className={`w-full ${
                      resetMode ? "bg-red-600" : "bg-blue-600"
                    } text-white py-2 rounded-lg text-xl font-bold`}
                    onClick={() => handleOrderClick(order)}
                  >
                    {resetMode ? "Reset Order" : getStatusText(order.status)}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Graveyard Section */}
        {servedOrders.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Recently Served Orders</h2>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {servedOrders.map((order) => (
                <div
                  key={order.orderId}
                  className={`border-4 rounded-lg p-4 shadow ${
                    resetMode ? "border-red-500" : "border-gray-500 bg-gray-200"
                  }`}
                >
                  <h2 className="text-2xl font-bold mb-2">
                    Order #{order.orderId}
                  </h2>
                  <p className="text-lg font-semibold mb-2 text-gray-600">
                    Status: Served
                  </p>
                  <ul className="space-y-1 mb-4">
                    {order.items.map((item, index) => (
                      <li key={index} className="text-lg">
                        {item}
                      </li>
                    ))}
                  </ul>
                  {resetMode && (
                    <button
                      className="w-full bg-red-600 text-white py-2 rounded-lg text-xl font-bold"
                      onClick={() => handleOrderClick(order)}
                    >
                      Reset Order
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <footer className="bg-gray-200 text-center py-4">Al Baik ©2024</footer>
    </div>
  );
}

export default StaffPage;
