import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  ArrowRight
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-top">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <ShoppingBag size={24} />
            <span>BuyBliss</span>
          </Link>
          <p>
            Experience pure bliss in every purchase. We bring you the finest collection
            of fashion and lifestyle products curated with love.
          </p>
          <div className="footer-socials">
            <a href="#" className="social-icon">
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://www.instagram.com/rishiiiis.frames"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <FaInstagram size={20} />
            </a>
            <a href="#" className="social-icon">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="social-icon">
              <FaYoutube size={20} />
            </a>
          </div>
        </div>

        <div className="footer-links-section">
          <div className="link-group">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/mens">Men Fashion</Link></li>
              <li><Link to="/womens">Women Fashion</Link></li>
              <li><Link to="/kids">Kids Collection</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>

          <div className="link-group">
            <h4>Customer Care</h4>
            <ul>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/faq">FAQs</Link></li>
              <li><Link to="/track-order">Track Order</Link></li>
              <li><Link to="/my-orders">My Account</Link></li>
              <li><Link to="/wishlist">Wishlist</Link></li>
            </ul>
          </div>

          <div className="link-group">
            <h4>Policies</h4>
            <ul>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/returns-policy">Returns & Refunds</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/shipping-info">Shipping Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-contact">
          <h4>Get in Touch</h4>
          <div className="contact-item">
            <MapPin size={18} />
            <p>Vemulawada, Rajanna Siricilla , Telangana</p>
          </div>
          <div className="contact-item">
            <Phone size={18} />
            <p>+91 9390839063</p>
          </div>
          <div className="contact-item">
            <Mail size={18} />
            <p>sandesaririshitha19@gmail.com</p>
          </div>

          <div className="footer-newsletter">
            <h5>Subscribe to Bliss</h5>
            <div className="newsletter-box">
              <input type="email" placeholder="Email address" />
              <button><ArrowRight size={20} /></button>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 BuyBliss. Built for Blissful Shopping.</p>
        <div className="payment-icons">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
