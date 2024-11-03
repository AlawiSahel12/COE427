// src/pages/MealsPage.jsx
import React, { useState } from "react";

function MealsPage() {
  const [meals, setMeals] = useState([
    { name: "Spicy Fish", spicy: true, required: 4, prepared: 2 },
    { name: "Normal Fish", spicy: false, required: 6, prepared: 3 },
  ]);

  const toggleItemPrepared = (itemName) => {
    setMeals((prevMeals) =>
      prevMeals.map((meal) =>
        meal.name === itemName
          ? { ...meal, prepared: meal.prepared + 1 }
          : meal,
      ),
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-yellow-600 text-white py-4">
        <h1 className="text-3xl font-bold text-center">Meals Menu</h1>
      </header>
      <main className="flex-grow container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Meals</h2>
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
            {meals.map((meal) => (
              <tr key={meal.name}>
                <td className="border border-gray-300 p-2">{meal.name}</td>
                <td className="border border-gray-300 p-2">
                  {meal.spicy ? "Spicy" : "Normal"}
                </td>
                <td className="border border-gray-300 p-2">{meal.required}</td>
                <td className="border border-gray-300 p-2">{meal.prepared}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    className="bg-green-500 text-white py-1 px-2 rounded"
                    onClick={() => toggleItemPrepared(meal.name)}
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

export default MealsPage;
