import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './FilterDrawer.css';

const FilterDrawer = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            className="drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div 
            className="filter-drawer glass-card"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="drawer-header">
              <h3>Filters</h3>
              <X size={24} onClick={onClose} />
            </div>

            <div className="drawer-content">
              <div className="filter-group">
                <h4>Price Range</h4>
                <div className="price-inputs">
                  <input type="number" placeholder="Min" />
                  <input type="number" placeholder="Max" />
                </div>
              </div>

              <div className="filter-group">
                <h4>Category</h4>
                <div className="checkbox-group">
                  <label><input type="checkbox" /> Mens</label>
                  <label><input type="checkbox" /> Womens</label>
                  <label><input type="checkbox" /> Kids</label>
                </div>
              </div>

              <div className="filter-group">
                <h4>Size</h4>
                <div className="size-chips">
                  {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                    <button key={size} className="size-chip">{size}</button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h4>Rating</h4>
                <div className="rating-select">
                  <label><input type="radio" name="rating" /> 4★ & Above</label>
                  <label><input type="radio" name="rating" /> 3★ & Above</label>
                </div>
              </div>
            </div>

            <div className="drawer-footer">
              <button className="clear-btn" onClick={onClose}>Clear All</button>
              <button className="apply-btn btn-primary" onClick={onClose}>Apply Filters</button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FilterDrawer;
