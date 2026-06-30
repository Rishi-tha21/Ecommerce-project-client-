import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./CSS/Checkout.css";
import { ShopContext } from "../Context/ShopContext";
import { AuthContext } from "../Context/AuthContext";
import API from "../../services/api";

const Checkout = () => {
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: "",
    address: "",
    phone: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  // 1. Get user directly from localStorage
  const { clearCart, getCartProducts } = useContext(ShopContext);
  const { user } = useContext(AuthContext);
  const cartItems =
    JSON.parse(localStorage.getItem("cart")) || getCartProducts();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || item.new_price || 0) * item.quantity,
    0,
  );
  const shippingFee = subtotal > 0 ? 50 : 0;
  const total = subtotal + shippingFee;

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    // Validate authentication
    if (!user) {
      alert("Please login to place order");
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      navigate("/cart");
      return;
    }

    if (
      !address.fullName ||
      !address.address ||
      !address.phone ||
      !address.city ||
      !address.state ||
      !address.pincode
    ) {
      alert("Please fill all delivery address details");
      return;
    }

    try {
      const orderItems = cartItems.map((item) => ({
        product: item.id || item.product || item._id,
        name: item.name,
        image: item.image,
        price: item.price || item.new_price,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
      }));

      const payload = {
        orderItems,
        shippingAddress: address,
        paymentMethod,
      };

      const { data: createdOrder } = await API.post("/orders", payload);

      // Clear cart locally and in ShopContext
      localStorage.removeItem("cart");
      clearCart();

      // Navigate to order confirmation
      navigate("/order-success", { state: { orderId: createdOrder._id } });
    } catch (err) {
      console.error("Place order failed", err);
      alert(
        err.response?.data?.message ||
          "Failed to place order. Please try again.",
      );
    }
  };

  // If user does NOT exist
  if (!user) {
    return (
      <div className="checkout-login-prompt">
        <h2>Please login to place your order</h2>
        <button onClick={() => navigate("/login")} className="btn-primary">
          Login
        </button>
      </div>
    );
  }

  return (
    <motion.div
      className="checkout"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="section-title">Checkout</h1>
      <div className="checkout-container">
        <div className="checkout-left">
          <motion.div
            className="checkout-form-container glass-card"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2>Delivery Address</h2>
            <div className="checkout-form">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={address.fullName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="address"
                placeholder="Street Address"
                value={address.address}
                onChange={handleChange}
              />
              <div className="checkout-row">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={address.city}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State/Province"
                  value={address.state}
                  onChange={handleChange}
                />
              </div>
              <div className="checkout-row">
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={address.pincode}
                  onChange={handleChange}
                />
              </div>
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={address.phone}
                onChange={handleChange}
              />
            </div>

            <h2>Payment Method</h2>
            <div className="checkout-payment">
              <label
                className={`payment-option ${paymentMethod === "Cash on Delivery" ? "selected" : ""}`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="Cash on Delivery"
                  checked={paymentMethod === "Cash on Delivery"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>💵 Cash on Delivery</span>
              </label>
              <label
                className={`payment-option ${paymentMethod === "Online" ? "selected" : ""}`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="Online"
                  checked={paymentMethod === "Online"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>💳 Online Payment (Coming Soon)</span>
              </label>
            </div>
          </motion.div>
        </div>

        <div className="checkout-right">
          <motion.div
            className="checkout-summary-container glass-card"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2>Order Summary</h2>
            <div className="checkout-summary">
              {cartItems.length === 0 ? (
                <p className="empty-cart-msg">Your cart is empty.</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="checkout-item">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <p className="checkout-item-name">{item.name}</p>
                      <p className="checkout-item-qty">
                        ₹{item.price || item.new_price} × {item.quantity}
                      </p>
                    </div>
                    <p className="checkout-item-total">
                      ₹{(item.price || item.new_price) * item.quantity}
                    </p>
                  </div>
                ))
              )}
            </div>

            <div className="checkout-totals">
              <div className="checkout-total-row">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="checkout-total-row">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? "Free" : `₹${shippingFee}`}</span>
              </div>
              <hr />
              <div className="checkout-total-row total">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button
              className="btn-primary checkout-btn"
              onClick={handlePlaceOrder}
              disabled={cartItems.length === 0}
            >
              Place Order
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;
