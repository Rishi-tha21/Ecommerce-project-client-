import React, { useContext, useState } from "react";
import "./ProductDisplay.css";
import { ShopContext } from "../Context/ShopContext";
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Truck, 
  ShieldCheck, 
  RotateCcw,
  Plus,
  Minus
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart, addToWishlist, isInWishlist, removeFromWishlist } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  const handleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  return (
    <div className="product-display-container">
      <div className="product-display-left">
        <div className="img-thumbnail-list">
          {[1, 2, 3, 4].map((i) => (
            <img key={i} src={product.image} alt="" className="thumbnail" />
          ))}
        </div>
        <div className="main-img-wrapper">
          <motion.img 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="main-product-img" 
            src={product.image} 
            alt={product.name} 
          />
        </div>
      </div>

      <div className="product-display-right">
        <p className="product-category-breadcrumb"> {product.category} , {product.name}</p>
        <h1 className="product-title">{product.name}</h1>
        
        <div className="product-rating-row">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} fill={i < 4 ? "#F59E0B" : "transparent"} color="#F59E0B" />
            ))}
          </div>
          <span>(122 Reviews)</span>
          <span className="stock-status">In Stock</span>
        </div>

        <div className="product-price-section">
          <span className="new-price">₹{product.new_price}</span>
          <span className="old-price">₹{product.old_price}</span>
          <span className="discount-tag">Save {Math.round(((product.old_price - product.new_price)/product.old_price)*100)}%</span>
        </div>

        <p className="product-short-desc">
          Elevate your everyday style with this premium {product.name}. Crafted from 
          high-quality materials for ultimate comfort and durability. Perfect for 
          versatile styling across all seasons.
        </p>

        <div className="selection-section">
          <h3>Select Size</h3>
          <div className="size-options">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <div 
                key={size} 
                className={`size-box ${selectedSize === size ? "active" : ""}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        <div className="purchase-actions">
          <div className="quantity-selector">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={16} /></button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}><Plus size={16} /></button>
          </div>
          
          <button className="add-to-cart-btn" onClick={() => {
            addToCart(product.id, quantity);
            toast.success(`${quantity} ${product.name} added to cart!`);
          }}>
            <ShoppingCart size={20} /> Add to Cart
          </button>
          
          <button 
            className={`wishlist-icon-btn ${isInWishlist(product.id) ? "active" : ""}`}
            onClick={handleWishlist}
          >
            <Heart size={24} fill={isInWishlist(product.id) ? "#EF4444" : "transparent"} />
          </button>
        </div>

        <div className="trust-badges">
          <div className="badge-item">
            <Truck size={20} />
            <div>
              <p>Free Delivery</p>
              <span>On orders over ₹1000</span>
            </div>
          </div>
          <div className="badge-item">
            <RotateCcw size={20} />
            <div>
              <p>30 Days Return</p>
              <span>Hassle-free exchanges</span>
            </div>
          </div>
          <div className="badge-item">
            <ShieldCheck size={20} />
            <div>
              <p>Secure Payment</p>
              <span>100% Protected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
