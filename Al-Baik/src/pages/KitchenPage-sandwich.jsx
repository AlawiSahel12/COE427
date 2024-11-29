// src/pages/MealsPage.jsx
import React, { useState ,useEffect} from "react";
import { Actions } from "../enum/orderStatus";

let Sandwiches = [
  {
      name: "Chicken Sandwich",
      required: 0,
      prepared: 0
  },
  {
      name: "Spicy Chicken Sandwich".replace(/\t/g, ''),
      required: 0,
      prepared: 0
  },
  {
      name: "Fish Sandwich",
      required: 0,
      prepared: 0
  },
  {
      name: "Spicy Fish Sandwich".replace(/\t/g, ''),
      required: 0,
      prepared: 0
  },
  {
      name: "Chicken Burger",
      required: 0,
      prepared: 0
  }
];


function SandwichesPage() {
  const [sandwiches, setSandwiches] = useState(Sandwiches);

  const [ws, setWs] = useState(null); // WebSocket state


  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");

    socket.onopen = () => {
      console.log("Connected to WebSocket server");
    };


    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.action === Actions.UPDATE_SANDWICH) {
        setSandwiches(message.data)

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



  const toggleItemPrepared = (itemName) => {

    if (ws && ws.readyState === WebSocket.OPEN) {
      const message = {
        action: Actions.ADD_PREPARED_SANDWICH,
        data: itemName,
      };

      // Send the message to the server
      ws.send(JSON.stringify(message));
      console.log("Order submitted:", message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-yellow-600 text-white py-4">
        <h1 className="text-3xl font-bold text-center">Sandwich Menu</h1>
      </header>
      <main className="flex-grow container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Meals</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Item Name</th>
              <th className="border border-gray-300 p-2">Required</th>
              <th className="border border-gray-300 p-2">Prepared</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {sandwiches.map((sandwich) => (
              <tr key={sandwich.name}>
                <td className="border border-gray-300 p-2">{sandwich.name}</td>
                <td className="border border-gray-300 p-2">{sandwich.required}</td>
                <td className="border border-gray-300 p-2">{sandwich.prepared}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    className="bg-green-500 text-white py-1 px-2 rounded"
                    onClick={() => toggleItemPrepared(sandwich.name)}
                  >
                    Prepare
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <footer className="bg-gray-200 text-center py-4">Al Baik ©2024</footer>
    </div>
  );
}

export default SandwichesPage;
