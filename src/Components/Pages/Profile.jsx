import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Edit2, Save, X } from "lucide-react";
import "./CSS/Profile.css";
import { toast } from "react-toastify";

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const { data } = await API.get("/auth/profile");
        setProfileData(data);
        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
        });
      } catch (err) {
        console.error("Failed to fetch profile", err);
        // Fallback to localStorage
        setProfileData(user);
        setFormData({
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
        });
      }
      setLoading(false);
    };

    fetchProfile();
  }, [user, authLoading, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const { data } = await API.put("/auth/profile", formData);
      setProfileData(data);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update profile", err);
      toast.error(err.response?.data?.message || "Failed to update profile");
    }
  };

  if (authLoading || loading) {
    return (
      <div className="profile-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="profile-container">
        <p>Failed to load profile. Please try again.</p>
      </div>
    );
  }

  return (
    <motion.div
      className="profile"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="profile-container">
        <h1 className="section-title">My Profile</h1>

        <div className="profile-content">
          <motion.div
            className="profile-card glass-card"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="profile-header">
              <div className="profile-avatar">
                {profileData.name
                  ? profileData.name.charAt(0).toUpperCase()
                  : "U"}
              </div>
              <div className="profile-info-display">
                <h2>{profileData.name}</h2>
                <p className="profile-role">
                  {profileData.role === "admin" ? "Admin" : "Customer"}
                </p>
              </div>
              {!isEditing && (
                <button className="btn-edit" onClick={() => setIsEditing(true)}>
                  <Edit2 size={18} /> Edit
                </button>
              )}
            </div>

            {!isEditing ? (
              <div className="profile-details">
                <div className="profile-item">
                  <Mail size={20} />
                  <div>
                    <label>Email</label>
                    <p>{profileData.email}</p>
                  </div>
                </div>
                <div className="profile-item">
                  <Phone size={20} />
                  <div>
                    <label>Phone</label>
                    <p>{profileData.phone}</p>
                  </div>
                </div>
                <div className="profile-item">
                  <MapPin size={20} />
                  <div>
                    <label>Member Since</label>
                    <p>
                      {profileData.createdAt
                        ? new Date(profileData.createdAt).toLocaleDateString(
                            "en-IN",
                          )
                        : "Not available"}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="profile-edit-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    disabled
                  />
                  <small>Email cannot be changed</small>
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="form-actions">
                  <button className="btn-primary" onClick={handleSave}>
                    <Save size={18} /> Save Changes
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        name: profileData.name || "",
                        email: profileData.email || "",
                        phone: profileData.phone || "",
                      });
                    }}
                  >
                    <X size={18} /> Cancel
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          <motion.div
            className="profile-stats-card glass-card"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h3>Account Statistics</h3>
            <div className="stats-grid">
              <div className="stat">
                <span className="stat-value">—</span>
                <span className="stat-label">Total Orders</span>
              </div>
              <div className="stat">
                <span className="stat-value">—</span>
                <span className="stat-label">Total Spent</span>
              </div>
              <div className="stat">
                <span className="stat-value">—</span>
                <span className="stat-label">Wishlist Items</span>
              </div>
            </div>
            <button className="btn-link" onClick={() => navigate("/orders")}>
              View My Orders →
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
