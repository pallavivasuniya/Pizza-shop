import React, { useEffect, useState } from "react";
import "./PizzaStages.css";

const PizzaStages = () => {
  const [pizzas, setPizzas] = useState([]);
  const [deliveredCount, setDeliveredCount] = useState(0);
  const [orderHistory, setOrderHistory] = useState([]);

  const sizeTimes = {
    small: 3 * 60,
    medium: 4 * 60,
    large: 5 * 60,
  };

  // Add new orders from localStorage
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const newOrders = savedOrders.map((order, index) => ({
      id: `new-${Date.now()}-${index}`, // Assign a unique id with timestamp
      size: order.size.toLowerCase(),
      stage: "Order Placed",
      timeSpent: 0,
      totalTime: 0,
      startTime: Date.now(), // Add start time for more accurate timing
    }));
    setPizzas((prevPizzas) => [...prevPizzas, ...newOrders]);
    // Clear the orders from localStorage after adding them
    localStorage.removeItem("orders");
  }, []);

  // Simulate time spent in each stage
  useEffect(() => {
    const interval = setInterval(() => {
      setPizzas((prevPizzas) =>
        prevPizzas.map((pizza) => {
          if (pizza.stage !== "Order Picked") {
            const currentTime = Date.now();
            const elapsedTime = Math.floor((currentTime - pizza.startTime) / 1000);
            return {
              ...pizza,
              timeSpent: elapsedTime - pizza.totalTime,
              totalTime: elapsedTime,
            };
          }
          return pizza;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Move pizza to the next stage
  const moveToNextStage = (id) => {
    setPizzas((prevPizzas) => {
      let orderDelivered = false;
      const updatedPizzas = prevPizzas.map((pizza) => {
        if (pizza.id === id) {
          const nextStage = getNextStage(pizza.stage);
          if (nextStage === "Order Picked" && pizza.stage !== "Order Picked") {
            orderDelivered = true;
            return null; // Remove from tracker
          }
          return { 
            ...pizza, 
            stage: nextStage, 
            timeSpent: 0,
            startTime: Date.now() // Reset start time for the new stage
          };
        }
        return pizza;
      }).filter((pizza) => pizza !== null);

      if (orderDelivered) {
        setDeliveredCount((prev) => prev + 1);
        setOrderHistory((prevHistory) => [...prevHistory, prevPizzas.find(p => p.id === id)]);
      }

      return updatedPizzas;
    });
  };

  const getNextStage = (currentStage) => {
    const stages = ["Order Placed", "Order in Making", "Order Ready", "Order Picked"];
    const currentIndex = stages.indexOf(currentStage);
    return stages[currentIndex + 1] || currentStage;
  };

  const stages = ["Order Placed", "Order in Making", "Order Ready", "Order Picked"];

  return (
    <div className="pizza-stages-container">
      <h2>Pizza Management System</h2>
      <div className="delivered">
        <h3>Total Pizzas Delivered: {deliveredCount}</h3>
      </div>

      {/* Main Display */}
      <div className="main-display">
        <table border="1" style={{ width: "100%", textAlign: "left" }}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Stage</th>
              <th>Total Time Spent</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pizzas.map((pizza) => (
              <tr key={pizza.id}>
                <td>{pizza.id}</td>
                <td>{pizza.stage}</td>
                <td>
                  {Math.floor(pizza.totalTime / 60)} min {pizza.totalTime % 60} sec
                </td>
                <td>
                  <button onClick={() => moveToNextStage(pizza.id)}>Next</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Stages */}
      <div className="stages">
        {stages.map((stage) => (
          <div key={stage} className="stage-column">
            <h3>{stage}</h3>
            {pizzas
              .filter((pizza) => pizza.stage === stage)
              .map((pizza) => (
                <div key={pizza.id} className="stage-card">
                  <p>Order {pizza.id}</p>
                  <p>Size: {pizza.size}</p>
                  <p>
                    Time: {Math.floor(pizza.timeSpent / 60)} min {pizza.timeSpent % 60} sec
                  </p>
                  <button onClick={() => moveToNextStage(pizza.id)}>Next</button>
                </div>
              ))}
          </div>
        ))}
      </div>

      {/* Order History */}
      <div className="order-history">
        <h3>Order History</h3>
        <ul>
          {orderHistory.map((pizza) => (
            <li key={pizza.id}>
              Order {pizza.id}: {pizza.size}, Delivered in {Math.floor(pizza.totalTime / 60)} min{" "}
              {pizza.totalTime % 60} sec
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PizzaStages;

