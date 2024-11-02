// src/pages/KitchenPage.jsx
import React, { useState } from 'react';

function KitchenPage() {
  const [orders, setOrders] = useState([
    {
      orderId: 1,
      items: [
        { name: 'Chicken Meal', prepared: false },
        { name: 'Fries', prepared: false },
      ],
    },
    {
      orderId: 2,
      items: [{ name: 'Fish Meal', prepared: false }],
    },
  ]);

  const toggleItemPrepared = (orderId, itemName) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === orderId
          ? {
              ...order,
              items: order.items.map((item) =>
                item.name === itemName
                  ? { ...item, prepared: !item.prepared }
                  : item
              ),
            }
          : order
      )
    );
  };

  const isOrderPrepared = (order) => order.items.every((item) => item.prepared);

  const markOrderAsReady = (orderId) => {
    console.log(`Order ${orderId} is ready.`);
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.orderId !== orderId)
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-yellow-600 text-white py-4">
        <h1 className="text-3xl font-bold text-center">Kitchen Orders</h1>
      </header>
      <main className="flex-grow container mx-auto p-4">
        {orders.length === 0 ? (
          <h2 className="text-xl font-bold text-center">
            No orders to prepare.
          </h2>
        ) : (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {orders.map((order) => (
              <div key={order.orderId} className="border rounded p-4 shadow">
                <h2 className="text-xl font-bold mb-2">
                  Order #{order.orderId}
                </h2>
                <ul className="space-y-2 mb-4">
                  {order.items.map((item) => (
                    <li key={item.name} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={item.prepared}
                        onChange={() =>
                          toggleItemPrepared(order.orderId, item.name)
                        }
                        className="mr-2"
                      />
                      <span>{item.name}</span>
                    </li>
                  ))}
                </ul>
                {isOrderPrepared(order) && (
                  <button
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                    onClick={() => markOrderAsReady(order.orderId)}
                  >
                    Mark as Ready
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
      <footer className="bg-gray-200 text-center py-4">Al Baik ©2024</footer>
    </div>
  );
}

export default KitchenPage;
