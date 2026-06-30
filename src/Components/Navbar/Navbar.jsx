import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import { AuthContext } from "../Context/AuthContext";
import {
  ShoppingCart,
  Heart,
  User,
  Search,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  Package,
  ShoppingBag,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getSearchSuggestions } from "../../utils/searchUtils";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [localUser, setLocalUser] = useState(null);
  const { getTotalCartItems, all_product, searchQuery, setSearchQuery } =
    useContext(ShopContext);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const checkUser = () => {
    const savedUser = localStorage.getItem("userInfo");
    if (savedUser) {
      setLocalUser(JSON.parse(savedUser));
    } else {
      setLocalUser(null);
    }
  };

  useEffect(() => {
    checkUser();
    window.addEventListener("user-login", checkUser);
    window.addEventListener("user-logout", checkUser);
    return () => {
      window.removeEventListener("user-login", checkUser);
      window.removeEventListener("user-logout", checkUser);
    };
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }
    setSuggestions(getSearchSuggestions(all_product, searchQuery, 5));
  }, [searchQuery, all_product]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setLocalUser(null);
    navigate("/");
  };

  const handleSearch = (e) => {
    if ((e.type === "keydown" && e.key === "Enter") || e.type === "click") {
      if (searchQuery.trim()) {
        navigate("/");
        setSearchOpen(false);
        setShowSuggestions(false);
      }
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    setSearchOpen(false);
    navigate("/");
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Men", path: "/mens" },
    { name: "Women", path: "/womens" },
    { name: "Kids", path: "/kids" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        {/* Mobile Menu Toggle */}
        <div
          className="nav-mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

        {/* Logo */}
        <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
          <div className="logo-icon">
            <ShoppingBag size={28} />
          </div>
          <span>BuyBliss</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="nav-links">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={location.pathname === item.path ? "active" : ""}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="nav-underline"
                    className="nav-underline"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Icons Area */}
        <div className="nav-icons">
          <div className="search-wrapper">
            <AnimatePresence>
              {searchOpen && (
                <div className="search-input-container">
                  <motion.input
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onKeyDown={handleSearch}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() =>
                      setTimeout(() => setShowSuggestions(false), 100)
                    }
                    autoFocus
                  />
                  <button className="search-btn" onClick={handleSearch}>
                    <Search size={18} />
                  </button>
                  {showSuggestions && searchQuery.trim() && (
                    <div className="search-suggestions glass-card">
                      {suggestions.length > 0 ? (
                        suggestions.map((item, index) => (
                          <button
                            key={index}
                            className="search-suggestion-item"
                            type="button"
                            onMouseDown={() => handleSuggestionClick(item)}
                          >
                            {item}
                          </button>
                        ))
                      ) : (
                        <div className="search-no-suggestions">
                          No suggestions yet. Try another keyword.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </AnimatePresence>
            <Search
              className="nav-icon"
              size={22}
              onClick={() => setSearchOpen(!searchOpen)}
            />
          </div>

          <Link to="/wishlist" className="nav-icon-link">
            <Heart className="nav-icon" size={22} />
          </Link>

          <Link to="/cart" className="nav-cart">
            <ShoppingCart className="nav-icon" size={22} />
            <span className="cart-count">{getTotalCartItems()}</span>
          </Link>

          <div className="nav-user-dropdown">
            <User className="nav-icon" size={22} />
            <div className="dropdown-content glass-card">
              {localUser ? (
                <>
                  <div className="dropdown-header">
                    <p className="user-name">{localUser.name || "User"}</p>
                    <p className="user-email">{localUser.email}</p>
                  </div>
                  <hr />
                  <Link to="/orders">
                    <Package size={18} /> My Orders
                  </Link>
                  {localUser.role === "admin" && (
                    <Link to="/admin">
                      <LayoutDashboard size={18} /> Admin Panel
                    </Link>
                  )}
                  <button onClick={handleLogout} className="logout-btn">
                    <LogOut size={18} /> Logout
                  </button>
                </>
              ) : (
                <Link to="/login">Login / Sign Up</Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-sidebar glass-card"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="sidebar-header">
              <span className="nav-logo">BuyBliss</span>
              <X size={24} onClick={() => setMenuOpen(false)} />
            </div>
            <ul className="sidebar-links">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link to={item.path} onClick={() => setMenuOpen(false)}>
                    {item.name}
                  </Link>
                </li>
              ))}
              {localUser && (
                <>
                  <li>
                    <Link to="/orders" onClick={() => setMenuOpen(false)}>
                      My Orders
                    </Link>
                  </li>
                  <li>
                    <Link to="/wishlist" onClick={() => setMenuOpen(false)}>
                      Wishlist
                    </Link>
                  </li>
                </>
              )}
              <li>
                {localUser ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="sidebar-logout"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="sidebar-login"
                  >
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
