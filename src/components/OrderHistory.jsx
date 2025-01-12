import React, { useEffect, useState } from 'react';

const OrderHistory = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setAllOrders(savedOrders);
  }, []);

  return (
    <div className="order-history">
      <h2>Order History</h2>
      {allOrders.length > 0 ? (
        <ul>
          {allOrders.map((order, index) => (
            <li key={index}>
              {`Order ${index + 1}: ${order.type}, ${order.size}, ${order.base}`}
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders placed yet.</p>
      )}
    </div>
  );
};

export default OrderHistory;
