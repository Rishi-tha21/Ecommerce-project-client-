import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, ShoppingCart, User } from 'lucide-react';
import { ShopContext } from '../Context/ShopContext';
import './BottomNavigation.css';

const BottomNavigation = () => {
  const { getTotalCartItems } = useContext(ShopContext);

  return (
    <div className="bottom-nav">
      <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <Home size={24} />
        <span>Home</span>
      </NavLink>
      <NavLink to="/search" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <Search size={24} />
        <span>Search</span>
      </NavLink>
      <NavLink to="/cart" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <div className="cart-icon-wrapper">
          <ShoppingCart size={24} />
          {getTotalCartItems() > 0 && <span className="badge">{getTotalCartItems()}</span>}
        </div>
        <span>Cart</span>
      </NavLink>
      <NavLink to="/login" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <User size={24} />
        <span>Profile</span>
      </NavLink>
    </div>
  );
};

export default BottomNavigation;
