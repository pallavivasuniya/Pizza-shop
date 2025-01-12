import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import img from "../assets/Pizza1.jpg";
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="text-content">
        <h1>Authentic <span >Pizzas</span> Timeless Flavors</h1>
        <h3>🍕 Welcome to Pizza Paradise 🍕</h3>
        <p>Craft your perfect pizza with fresh ingredients and enjoy quick delivery to your door!</p>
        {/* Link the button to the About page */}
        <Link to="/about">
          <button>Read More</button>
        </Link>
      </div>
      <div className="image-content">
        <img src={img} alt="Pizza1" />
      </div>
    </div>
  );
};

export default Home;
