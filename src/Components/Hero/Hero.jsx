import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag, Sparkles } from "lucide-react";
import "./Hero.css";
import hero_img from "../Assets/custom/clothing_store_hero.png";
import logo_big from "../Assets/logo_big.png";

const Hero = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <motion.div 
          className="hero-text"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="hero-logo-container">
            <img src={logo_big} alt="BuyBliss Logo" className="hero-logo" />
          </div>
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>New Season Collections</span>
          </div>
          <h1>
            Experience <span className="text-gradient">Pure Bliss</span> In Every Purchase
          </h1>
          <p>
            Discover the latest trends with BuyBliss. Premium quality, curated styles, 
            and a shopping experience designed just for you.
          </p>
          
          <div className="hero-btns">
            <Link to="/womens" className="btn-primary">
              Shop Now <ArrowRight size={20} />
            </Link>
            <Link to="/mens" className="btn-secondary">
              View Collections
            </Link>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <h3>25k+</h3>
              <p>Customers</p>
            </div>
            <div className="stat-line" />
            <div className="stat-item">
              <h3>500+</h3>
              <p>Brands</p>
            </div>
          </div>
        </motion.div>

        <div className="hero-visual">
          <div className="hero-image-wrapper">
            <img src={hero_img} alt="Premium Clothing Store" className="hero-main-img" />
          </div>
          
          {/* Floating Elements */}
          <motion.div 
            className="floating-card glass-card"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="icon-box">
              <ShoppingBag size={24} color="#F59E0B" />
            </div>
            <div>
              <h4>Premium Quality</h4>
              <p>100% Authentic</p>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Background Decor */}
      <div className="hero-bg-glow" />
    </div>
  );
};

export default Hero;
