import React, { useContext, useState } from "react";
import "./Item.css";
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Item = (props) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } =
    useContext(ShopContext);
  const [imageError, setImageError] = useState(false);

  const handleWishlist = (e) => {
    e.preventDefault();
    if (isInWishlist(props.id)) {
      removeFromWishlist(props.id);
    } else {
      addToWishlist(props.id);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(props.id);
    toast.success(`${props.name} added to cart!`);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const discount = Math.round(
    ((props.old_price - props.new_price) / props.old_price) * 100,
  );

  // Fallback image placeholder
  const fallbackImage = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23f0f0f0' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' font-size='14' fill='%23999' text-anchor='middle' dy='.3em'%3EImage Not Available%3C/text%3E%3C/svg%3E`;

  return (
    <motion.div
      className="item-card"
      whileHover={{ y: -10 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="item-image-container">
        <Link to={`/product/${props.id}`}>
          <img
            onClick={() => window.scrollTo(0, 0)}
            src={imageError ? fallbackImage : props.image}
            onError={handleImageError}
            alt={props.name}
            className="item-image"
            loading="lazy"
          />
        </Link>

        {discount > 0 && <div className="discount-badge">-{discount}%</div>}

        <button
          className={`wishlist-btn ${isInWishlist(props.id) ? "active" : ""}`}
          onClick={handleWishlist}
        >
          <Heart
            size={20}
            fill={isInWishlist(props.id) ? "#EF4444" : "transparent"}
          />
        </button>

        <div className="item-overlay mobile-touch">
          <button className="quick-add-btn" onClick={handleAddToCart}>
            <ShoppingCart size={18} /> <span>Add to Cart</span>
          </button>
        </div>
      </div>

      <div className="item-info">
        <p className="item-category">{props.category || "General"}</p>
        <Link to={`/product/${props.id}`} className="item-name-link">
          <h3 className="item-name">{props.name}</h3>
        </Link>

        <div className="item-rating">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              fill={i < 4 ? "#F59E0B" : "transparent"}
              color="#F59E0B"
            />
          ))}
          <span>(4.0)</span>
        </div>

        <div className="item-prices">
          <div className="item-price-new">₹{props.new_price}</div>
          <div className="item-price-old">₹{props.old_price}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default Item;
