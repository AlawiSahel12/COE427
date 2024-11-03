// src/pages/NotFoundPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-8xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-3xl mb-6">Oops! Page not found.</p>
      <button
        className="bg-blue-600 text-white px-8 py-4 rounded-lg text-2xl font-bold"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
}

export default NotFoundPage;
