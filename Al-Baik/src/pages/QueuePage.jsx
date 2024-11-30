// src/pages/QueuePage.jsx
import React, { useEffect, useState } from "react";
import { Actions } from "../enum/orderStatus";

function QueuePage() {
  const [orders, setOrders] = useState([
    // ...more orders
  ]);


  const [ws, setWs] = useState(null); // WebSocket state


  // Simulate real-time updates (for demonstration purposes)
  useEffect(() => {
    const socket = new WebSocket(import.meta.env.VITE_REACT_APP_SOCKET_URL);

    socket.onopen = () => {
      console.log("Connected to WebSocket server");
    };


    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.action === Actions.ORDER_LIST_UPDATE) {
        setOrders(message.data)

      } 
    };

    socket.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    setWs(socket); // Save the WebSocket object

    return () => {
      // Cleanup WebSocket connection when component unmounts
      socket.close();
    };
  }, [])

  const waitingOrders = orders.filter((order) => order.status === "Waiting");
  const readyOrders = orders.filter((order) => order.status === "Served");

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-green-600 text-white py-4">
        <h1 className="text-3xl font-bold text-center">Order Status</h1>
      </header>
      <main className="flex-grow container mx-auto p-4">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
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
                    key={order.orderNumber}
                    className="bg-gray-200 rounded-lg py-4 text-center text-2xl font-bold"
                  >
                    Order #{order.orderNumber}
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
                    key={order.orderNumber}
                    className="bg-green-200 rounded-lg py-4 text-center text-2xl font-bold"
                  >
                    Order #{order.orderNumber}
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
