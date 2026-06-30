import React from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./CSS/OrderSuccess.css";
import { CheckCircle, Package, ArrowRight } from "lucide-react";

const OrderSuccess = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (
    <motion.div
      className="order-success"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="order-success-container">
        <motion.div
          className="order-success-content"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        >
          <div className="success-icon">
            <CheckCircle size={80} strokeWidth={1} />
          </div>

          <h1>Order Placed Successfully!</h1>
          <p className="subtitle">
            Thank you for your purchase. Your order has been confirmed.
          </p>

          {orderId && (
            <motion.div
              className="order-id-box"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="order-id-label">Order ID</p>
              <p className="order-id-value">{orderId}</p>
              <small>Keep this ID for tracking your order</small>
            </motion.div>
          )}

          <motion.div
            className="order-info"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="info-item">
              <Package size={24} />
              <div>
                <h3>Order Confirmation</h3>
                <p>
                  Email confirmation has been sent to your registered email
                  address.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="order-success-actions">
            <Link to="/orders" className="btn-primary">
              View My Orders <ArrowRight size={18} />
            </Link>
            <Link to="/" className="btn-secondary">
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OrderSuccess;
