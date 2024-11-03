// src/pages/ReceiptPage.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ReceiptPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { orderNumber, items } = location.state || {};

  const totalAmount = items
    ? items.reduce((total, item) => total + item.totalPrice, 0).toFixed(2)
    : "0.00";

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <header className="bg-red-600 text-white py-4 w-full">
        <h1 className="text-3xl font-bold text-center">
          Thank You for Your Order!
        </h1>
      </header>
      <main className="flex-grow container mx-auto p-4 flex flex-col items-center justify-center">
        {/* Receipt Shape */}
        <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
          {/* Receipt Decoration */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-gray-200 rounded-t-lg flex justify-center items-center">
            <div className="w-16 h-1 bg-gray-400"></div>
          </div>

          <h2 className="text-2xl font-bold text-center mb-4 mt-8">
            Order Number:{" "}
            <span className="text-red-600 text-4xl">{orderNumber}</span>
          </h2>

          <ul className="mb-4">
            {items &&
              items.map((item, index) => (
                <li key={index} className="flex justify-between py-2">
                  <span>
                    {item.quantity} x {item.name}
                  </span>
                  <span>SAR {item.totalPrice.toFixed(2)}</span>
                </li>
              ))}
          </ul>

          <div className="border-t pt-4">
            <div className="flex justify-between font-bold text-xl">
              <span>Total</span>
              <span>SAR {totalAmount}</span>
            </div>
          </div>
        </div>

        <button
          className="mt-8 bg-green-600 text-white py-3 px-6 rounded-lg text-2xl font-bold"
          onClick={() => navigate("/")}
        >
          Done
        </button>
      </main>
      <footer className="bg-gray-200 text-center py-4 w-full">
        Al Baik ©2024
      </footer>
    </div>
  );
}

export default ReceiptPage;
