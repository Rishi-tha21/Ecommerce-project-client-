import React, { useState, useEffect } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";
import "./CSS/Admin.css";

const statuses = ["Pending", "Confirmed", "Packed", "Shipped", "Delivered", "Cancelled"];
const statusColors = {
  Pending: "#f59e0b", Confirmed: "#3b82f6", Packed: "#8b5cf6",
  Shipped: "#06b6d4", Delivered: "#10b981", Cancelled: "#ef4444",
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get("/orders");
      setOrders(data);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (orderId, status) => {
    try {
      await API.put(`/orders/${orderId}/status`, { orderStatus: status });
      toast.success(`Order status updated to ${status}`);
      fetchOrders();
    } catch (err) { toast.error("Failed to update status"); }
  };

  if (loading) return <div className="admin"><div className="loading-spinner"></div></div>;

  return (
    <div className="admin">
      <h1>Manage Orders</h1>
      {orders.length === 0 ? <p className="admin-empty">No orders yet</p> : (
        <div className="admin-orders-list">
          {orders.map((order) => (
            <div key={order._id} className="admin-order-card">
              <div className="admin-order-header">
                <div>
                  <strong>Order #{order._id.slice(-8).toUpperCase()}</strong>
                  <p>{order.user?.name} ({order.user?.email})</p>
                  <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="admin-order-status">
                  <span className="order-status" style={{ backgroundColor: statusColors[order.orderStatus] }}>{order.orderStatus}</span>
                  <select value={order.orderStatus} onChange={(e) => updateStatus(order._id, e.target.value)}>
                    {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="admin-order-items">
                {order.orderItems.map((item, i) => (
                  <div key={i} className="admin-order-item">
                    <span>{item.name}</span><span>×{item.quantity}</span><span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="admin-order-footer">
                <span>Payment: {order.paymentMethod} ({order.paymentStatus})</span>
                <strong>Total: ₹{order.totalAmount}</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
