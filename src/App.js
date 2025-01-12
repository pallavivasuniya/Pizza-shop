import React, { useState } from 'react';
import ReactDOM from 'react-dom/client'; // Import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
//import { store } from './redux/store'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; // CSS for App
import './index.css'; // Index CSS

// Import components
import Home from './components/Home';
import Sidebar from './components/Sidebar';
import OrderForm from './components/OrderForm';
import PizzaStages from './components/PizzaStages'; 
import About from './components/About';
import Contact from './components/Contact';
import OrderHistory from './components/OrderHistory';

const App = () => {
  // State to manage sidebar toggle
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle the sidebar state
  };

  return (
    <Router>
      <div className={`App ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        {/* Hamburger icon to toggle sidebar */}
        <button onClick={toggleSidebar} className="sidebar-toggle">
          {isSidebarOpen ? '✖' : '☰'} {/* Change icon on toggle */}
        </button>

        {/* Sidebar, passing the isOpen prop to Sidebar */}
        <Sidebar isOpen={isSidebarOpen} />

        <div className="content">
          <Routes>
            {/* Define unique paths for each route */}
            <Route path="/" element={<Home />} />
            <Route path="/order" element={<OrderForm />} />
            <Route path="/history" element={<OrderHistory />} />
            <Route path="/About" element={<About/>} />
            <Route path="/tracker" element={<PizzaStages />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

// Correct ReactDOM rendering for React 18
const root = ReactDOM.createRoot(document.getElementById('root')); // Create root for React 18
root.render(<App />); // Render the App component

export default App;
