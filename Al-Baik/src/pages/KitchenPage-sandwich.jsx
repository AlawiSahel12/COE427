// src/pages/SandwichesPage.jsx
import React, { useState } from 'react';

function SandwichesPage() {
  const [sandwiches, setSandwiches] = useState([
    { name: 'Spicy Chicken Sandwich', spicy: true, required: 5, prepared: 3 },
    { name: 'Normal Chicken Sandwich', spicy: false, required: 8, prepared: 5 },
  ]);

  const toggleItemPrepared = (itemName) => {
    setSandwiches((prevSandwiches) =>
      prevSandwiches.map((sandwich) =>
        sandwich.name === itemName
          ? { ...sandwich, prepared: sandwich.prepared + 1 }
          : sandwich
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-yellow-600 text-white py-4">
        <h1 className="text-3xl font-bold text-center">Sandwiches Menu</h1>
      </header>
      <main className="flex-grow container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Sandwiches</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Item Name</th>
              <th className="border border-gray-300 p-2">Type</th>
              <th className="border border-gray-300 p-2">Required</th>
              <th className="border border-gray-300 p-2">Prepared</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {sandwiches.map((sandwich) => (
              <tr key={sandwich.name}>
                <td className="border border-gray-300 p-2">{sandwich.name}</td>
                <td className="border border-gray-300 p-2">{sandwich.spicy ? 'Spicy' : 'Normal'}</td>
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
