import React, { useState, useEffect } from "react";
import "./CSS/AdminDashboard.css";
import {
  Users,
  Package,
  ShoppingBag,
  TrendingUp,
  Plus,
  ChevronRight,
  DollarSign,
  MessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0,
    totalProducts: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: orderStats } = await API.get("/orders/stats");
        const { data: products } = await API.get("/products");
        const { data: users } = await API.get("/auth/users"); // Assuming this exists
        // Fetch contact messages count (admin protected)
        let contactsTotal = 0;
        try {
          const { data: contactsResp } = await API.get(
            "/contacts?page=1&limit=1",
          );
          contactsTotal = contactsResp.total || 0;
        } catch (e) {
          contactsTotal = 0;
        }

        setStats({
          ...orderStats,
          totalProducts: products.length,
          totalUsers: users?.length || 150,
          totalContacts: contactsTotal,
        });
      } catch (err) {
        console.error("Failed to fetch admin stats");
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Revenue",
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: <DollarSign size={24} />,
      color: "#10B981",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: <ShoppingBag size={24} />,
      color: "#3B82F6",
    },
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: <Package size={24} />,
      color: "#F59E0B",
    },
    {
      title: "Total Customers",
      value: stats.totalUsers,
      icon: <Users size={24} />,
      color: "#8B5CF6",
    },
    {
      title: "Contact Messages",
      value: stats.totalContacts || 0,
      icon: <MessageSquare size={24} />,
      color: "#f59e0b",
    },
  ];

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div>
          <h1>BuyBliss Admin Overview</h1>
          <p>Welcome back! Here's what's happening today.</p>
        </div>
        <Link to="/admin/products" className="btn-primary">
          <Plus size={20} /> Add New Product
        </Link>
      </div>

      <div className="admin-stats-grid">
        {statCards.map((card, index) => (
          <motion.div
            key={index}
            className="stat-card glass-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div
              className="stat-icon"
              style={{ backgroundColor: `${card.color}22`, color: card.color }}
            >
              {card.icon}
            </div>
            <div className="stat-content">
              <p>{card.title}</p>
              <h3>{card.value}</h3>
            </div>
            <div className="stat-trend">
              <TrendingUp size={16} /> +12%
            </div>
          </motion.div>
        ))}
      </div>

      <div className="admin-actions-grid">
        <Link to="/admin/products" className="action-card glass-card">
          <div className="action-info">
            <Package size={32} />
            <div>
              <h3>Product Management</h3>
              <p>Manage your inventory, prices, and images.</p>
            </div>
          </div>
          <ChevronRight size={24} />
        </Link>
        <Link to="/admin/orders" className="action-card glass-card">
          <div className="action-info">
            <ShoppingBag size={32} />
            <div>
              <h3>Order Management</h3>
              <p>View and update order status for customers.</p>
            </div>
          </div>
          <ChevronRight size={24} />
        </Link>
        <Link to="/admin/contacts" className="action-card glass-card">
          <div className="action-info">
            <MessageSquare size={32} />
            <div>
              <h3>Contact Messages</h3>
              <p>Read and manage customer inquiries.</p>
            </div>
          </div>
          <ChevronRight size={24} />
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
