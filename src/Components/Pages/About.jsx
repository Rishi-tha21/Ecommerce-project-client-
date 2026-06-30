import React from "react";
import "./CSS/About.css";

const About = () => {
  return (
    <div className="about">
      <div className="about-hero">
        <h1>About SHOPPER</h1>
        <p>Your trusted destination for trendy fashion</p>
      </div>
      <div className="about-content">
        <div className="about-section">
          <h2>Our Story</h2>
          <p>Founded in 2024, SHOPPER has grown from a small online boutique to one of the most trusted fashion destinations. We believe that fashion should be accessible, affordable, and fun for everyone.</p>
        </div>
        <div className="about-values">
          <div className="about-value-card">
            <div className="value-icon">🎯</div>
            <h3>Quality First</h3>
            <p>We source only the finest materials and work with trusted manufacturers.</p>
          </div>
          <div className="about-value-card">
            <div className="value-icon">💰</div>
            <h3>Best Prices</h3>
            <p>Get premium fashion at prices that won't break the bank.</p>
          </div>
          <div className="about-value-card">
            <div className="value-icon">🚚</div>
            <h3>Fast Delivery</h3>
            <p>Free shipping on orders above ₹500. Quick and reliable delivery.</p>
          </div>
          <div className="about-value-card">
            <div className="value-icon">🔄</div>
            <h3>Easy Returns</h3>
            <p>30-day hassle-free return policy on all products.</p>
          </div>
        </div>
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>To make fashion inclusive and accessible for everyone—men, women, and kids. We curate the latest trends and timeless classics so you can express your unique style confidently.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
