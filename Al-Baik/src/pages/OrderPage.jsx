// src/pages/OrderPage.jsx
import React, { useState } from 'react';

const menuItems = [
  { name: 'Chicken Meal', price: 20 },
  { name: 'Fish Meal', price: 18 },
  { name: 'Shrimp Meal', price: 22 },
  { name: 'Fries', price: 5 },
  { name: 'Drink', price: 3 },
];

function OrderPage() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(menuItems[0]);
  const [quantity, setQuantity] = useState(1);

  const addItemToOrder = () => {
    const existingItemIndex = selectedItems.findIndex(
      (item) => item.name === currentItem.name
    );

    if (existingItemIndex !== -1) {
      const updatedItems = [...selectedItems];
      updatedItems[existingItemIndex].quantity += quantity;
      updatedItems[existingItemIndex].totalPrice +=
        currentItem.price * quantity;
      setSelectedItems(updatedItems);
    } else {
      setSelectedItems([
        ...selectedItems,
        {
          name: currentItem.name,
          price: currentItem.price,
          quantity,
          totalPrice: currentItem.price * quantity,
        },
      ]);
    }

    setQuantity(1);
  };

  const handleSubmitOrder = () => {
    // Send order to backend
    console.log('Order submitted:', selectedItems);
    setSelectedItems([]);
    setQuantity(1);
    setCurrentItem(menuItems[0]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-red-600 text-white py-4">
        <h1 className="text-3xl font-bold text-center">Al Baik Order System</h1>
      </header>
      <main className="flex-grow container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Menu Items */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-2xl font-bold mb-4">Menu</h2>
            <div className="grid grid-cols-2 gap-4">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  className={`border rounded-lg p-4 text-center ${
                    currentItem.name === item.name
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200'
                  }`}
                  onClick={() => setCurrentItem(item)}
                  style={{ minHeight: '80px' }}
                >
                  <span className="block text-lg font-semibold">
                    {item.name}
                  </span>
                  <span className="block text-md">SAR {item.price}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            {selectedItems.length === 0 ? (
              <p className="text-center">No items in the order.</p>
            ) : (
              <ul className="space-y-2">
                {selectedItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <span className="text-lg">
                      {item.quantity} x {item.name}
                    </span>
                    <span className="text-lg font-semibold">
                      SAR {item.totalPrice}
                    </span>
                  </li>
                ))}
                <li className="flex justify-between items-center pt-2 border-t">
                  <span className="text-xl font-bold">Total</span>
                  <span className="text-xl font-bold">
                    SAR{' '}
                    {selectedItems.reduce(
                      (total, item) => total + item.totalPrice,
                      0
                    )}
                  </span>
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Quantity Selector and Actions */}
        <div className="mt-6 flex flex-col items-center">
          <div className="flex items-center mb-4">
            <button
              className="w-16 h-16 bg-gray-300 text-2xl font-bold rounded-full"
              onClick={() =>
                setQuantity((prev) => (prev > 1 ? prev - 1 : prev))
              }
            >
              -
            </button>
            <span className="mx-6 text-3xl font-bold">{quantity}</span>
            <button
              className="w-16 h-16 bg-gray-300 text-2xl font-bold rounded-full"
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              +
            </button>
          </div>
          <button
            className="w-full max-w-md bg-red-600 text-white py-4 rounded-lg text-2xl font-bold mb-4"
            onClick={addItemToOrder}
          >
            Add to Order
          </button>
          <button
            className={`w-full max-w-md bg-green-600 text-white py-4 rounded-lg text-2xl font-bold ${
              selectedItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleSubmitOrder}
            disabled={selectedItems.length === 0}
          >
            Submit Order
          </button>
        </div>
      </main>
      <footer className="bg-gray-200 text-center py-4">Al Baik ©2024</footer>
    </div>
  );
}

export default OrderPage;
