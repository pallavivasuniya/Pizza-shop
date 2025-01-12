import React from 'react';
import './Contact.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p>
          🍕 Thank you for visiting <span>Pizza Paradise</span>. We’re here to serve you the best slices every day! 🍕
        </p>
        <p>
          Stay connected with us on social media for updates, deals, and more!
        </p>
        <div className="social-media">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> | 
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a> | 
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
        </div>
        <p>
          For inquiries, reach out to us at <a href="mailto:contact@pizzaparadise.com">contact@pizzaparadise.com</a>.
        </p>
      </div>
      <div className="footer-copyright">
        <p>© {new Date().getFullYear()} Pizza Paradise. All Rights Reserved.</p>
        <p>
          Designed with ❤️ by <a href="https://yourwebsite.com" target="_blank" rel="noopener noreferrer">Pallavi</a>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
