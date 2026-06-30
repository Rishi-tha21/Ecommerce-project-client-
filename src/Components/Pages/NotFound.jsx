import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import './CSS/NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <motion.div 
        className="not-found-content glass-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Page Not Found</h2>
        <p className="error-message">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary home-btn">
          <Home size={20} /> Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
