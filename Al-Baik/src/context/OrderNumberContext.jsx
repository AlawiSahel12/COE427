// src/context/OrderNumberContext.jsx
import React, { createContext, useState } from "react";

const OrderNumberContext = createContext();

export function OrderNumberProvider({ children }) {
  const [orderNumber, setOrderNumber] = useState(0);

  const getNextOrderNumber = () => {
    setOrderNumber((prevNumber) => {
      const nextNumber = prevNumber >= 999 ? 1 : prevNumber + 1;
      return nextNumber;
    });
  };

  return (
    <OrderNumberContext.Provider value={{ orderNumber, getNextOrderNumber }}>
      {children}
    </OrderNumberContext.Provider>
  );
}

export default OrderNumberContext;
