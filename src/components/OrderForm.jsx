import React, { useState, useEffect } from 'react';

const OrderForm = () => {
  const [order, setOrder] = useState({
    type: 'Veg',
    size: 'Large',
    base: 'Thin',
  });

  const [currentOrders, setCurrentOrders] = useState(() => {
    const savedOrders = localStorage.getItem('currentOrders');
    return savedOrders ? parseInt(savedOrders, 10) : 0;
  });

  const maxOrders = 10;
  const [successMessage, setSuccessMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({
      ...order,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentOrders < maxOrders) {
      // Store the current order in local storage
      const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
      const updatedOrders = [...savedOrders, order];
      localStorage.setItem('orders', JSON.stringify(updatedOrders));

      // Update the current orders count
      setCurrentOrders(currentOrders + 1);
      localStorage.setItem('currentOrders', currentOrders + 1);

      setSuccessMessage('Order placed successfully!');
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Reset the orders count and clear local storage
  const resetOrders = () => {
    setCurrentOrders(0);
    localStorage.removeItem('currentOrders');
    localStorage.removeItem('orders');
  };

  return (
    <div className="wrapper">
      {currentOrders < maxOrders ? (
        <div className="form box order">
          <h2>Order Your Pizza</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <label htmlFor="type">Type: </label>
              <select
                id="type"
                name="type"
                value={order.type}
                onChange={handleChange}
              >
                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
              </select>
            </div>
            <div className="input-box">
              <label htmlFor="size">Size: </label>
              <select
                id="size"
                name="size"
                value={order.size}
                onChange={handleChange}
              >
                <option value="Large">Large</option>
                <option value="Medium">Medium</option>
                <option value="Small">Small</option>
              </select>
            </div>
            <div className="input-box">
              <label htmlFor="base">Base: </label>
              <select
                id="base"
                name="base"
                value={order.base}
                onChange={handleChange}
              >
                <option value="Thin">Thin</option>
                <option value="Thick">Thick</option>
              </select>
            </div>
            <div className="submit-btn">
              <button type="submit">Place Order</button>
            </div>
          </form>
          {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
      ) : (
        <div className="message">
          <h2>Maximum orders reached. Not taking any more orders!</h2>
          <button onClick={resetOrders}>Reset Orders</button>
        </div>
      )}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Thank you for placing your order!</h2>
            <p>We are preparing your pizza. It will be delivered shortly! 🍕</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderForm;

