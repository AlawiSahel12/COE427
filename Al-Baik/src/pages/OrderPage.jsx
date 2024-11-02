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
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [orderItems, setOrderItems] = useState([]);

  const addItemToOrder = () => {
    if (!selectedItem) return;

    const item = menuItems.find((menuItem) => menuItem.name === selectedItem);
    const totalPrice = item.price * quantity;

    const newOrderItem = {
      name: item.name,
      price: item.price,
      quantity,
      totalPrice,
    };

    setOrderItems([...orderItems, newOrderItem]);
    setSelectedItem('');
    setQuantity(1);
  };

  const handleSubmitOrder = () => {
    // Here you would send the order to the backend server
    console.log('Order submitted:', orderItems);
    setOrderItems([]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-red-600 text-white py-4">
        <h1 className="text-3xl font-bold text-center">Al Baik Order System</h1>
      </header>
      <main className="flex-grow container mx-auto p-4">
        <div className="max-w-md mx-auto">
          <div className="mb-4">
            <label className="block text-gray-700">Select Item</label>
            <select
              className="w-full border border-gray-300 p-2 rounded"
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value)}
            >
              <option value="" disabled>
                -- Select an item --
              </option>
              {menuItems.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name} - SAR {item.price}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Quantity</label>
            <input
              type="number"
              min="1"
              className="w-full border border-gray-300 p-2 rounded"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
          <button
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
            onClick={addItemToOrder}
          >
            Add to Order
          </button>
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Order Items</h2>
            {orderItems.length === 0 ? (
              <p>No items in the order.</p>
            ) : (
              <ul className="space-y-2">
                {orderItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between border-b pb-2"
                  >
                    <span>
                      {item.quantity} x {item.name}
                    </span>
                    <span>Total: SAR {item.totalPrice}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            className="w-full bg-green-600 text-white py-2 rounded mt-4 hover:bg-green-700"
            onClick={handleSubmitOrder}
            disabled={orderItems.length === 0}
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
