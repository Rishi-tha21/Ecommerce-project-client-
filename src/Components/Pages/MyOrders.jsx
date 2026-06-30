import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { motion } from "framer-motion";
import "./CSS/MyOrders.css";

const statusColors = {
  Pending: "#f59e0b",
  Confirmed: "#3b82f6",
  Packed: "#8b5cf6",
  Shipped: "#06b6d4",
  Delivered: "#10b981",
  Cancelled: "#ef4444",
};

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user, loading: authLoading } = useContext(AuthContext);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const { data } = await API.get("/orders/my-orders");
        setOrders(data || []);
      } catch (err) {
        console.warn(
          "Failed to fetch orders from API, falling back to localStorage",
          err.message,
        );
        try {
          const savedOrders = JSON.parse(
            localStorage.getItem("orders") || "[]",
          );
          const userOrders = savedOrders.filter(
            (o) => o.user && o.user.email === user.email,
          );
          setOrders(userOrders.reverse());
        } catch (e) {
          setOrders([]);
        }
      }
      setLoading(false);
    };

    fetchOrders();
  }, [navigate, authLoading, user]);

  if (loading)
    return (
      <div className="myorders">
        <div className="loading-spinner"></div>
      </div>
    );

  return (
    <motion.div
      className="myorders"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="section-title">My Orders</h1>
      {orders.length === 0 ? (
        <motion.div
          className="myorders-empty glass-card"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <p>📦 No orders yet</p>
          <button className="btn-primary" onClick={() => navigate("/")}>
            Start Shopping
          </button>
        </motion.div>
      ) : (
        <div className="myorders-list">
          {orders.map((order, index) => (
            <motion.div
              key={order.id || order._id || index}
              className="myorders-card glass-card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="myorders-header">
                <div>
                  <p className="order-id">
                    Order #
                    {String(order.id || order._id)
                      .slice(-8)
                      .toUpperCase()}
                  </p>
                  <p className="order-date">
                    {new Date(order.date || order.createdAt).toLocaleDateString(
                      "en-IN",
                      { day: "numeric", month: "short", year: "numeric" },
                    )}
                  </p>
                </div>
                <span
                  className="order-status"
                  style={{
                    backgroundColor:
                      statusColors[order.status || order.orderStatus] || "#888",
                  }}
                >
                  {order.status || order.orderStatus || "Processing"}
                </span>
              </div>
              <div className="myorders-items">
                {(order.items || order.orderItems || []).map((item, i) => (
                  <div key={i} className="myorders-item">
                    <span>{item.name}</span>
                    <span>×{item.quantity}</span>
                    <span>
                      ₹{(item.price || item.new_price) * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
              <div className="myorders-footer">
                <span>Payment: {order.paymentMethod || "COD"}</span>
                <span className="order-total">
                  Total: ₹{order.total || order.totalPrice || order.totalAmount}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default MyOrders;
