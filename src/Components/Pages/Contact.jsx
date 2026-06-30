import React, { useState } from "react";
import "./CSS/Contact.css";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import API from "../../services/api";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message || !form.phone) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      await API.post("/contacts", form);
      setSubmitted(true);
      toast.success("Message sent successfully! We'll get back to you soon.");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Failed to send the message. Please try again later.",
      );
    }
  };

  const contactInfo = [
    {
      icon: <MapPin size={24} />,
      title: "Visit Our Store",
      content: "Vemulawada, Rajanna Siricilla, Telangana, India",
      color: "#3B82F6",
    },
    {
      icon: <Phone size={24} />,
      title: "Call Us",
      content: "+91 9390839063",
      color: "#10B981",
    },
    {
      icon: <Mail size={24} />,
      title: "Email Us",
      content: "sandesaririshitha19@gmail.com",
      color: "#F59E0B",
    },
    {
      icon: <Clock size={24} />,
      title: "Working Hours",
      content: "Mon - Sat: 9:00 AM - 8:00 PM",
      color: "#8B5CF6",
    },
  ];

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Let's <span className="text-gradient">Connect</span>
        </motion.h1>
        <p>Have a question or feedback? We'd love to hear from you.</p>
      </div>

      <div className="contact-container">
        <div className="contact-grid">
          {/* Left Side: Info Cards */}
          <div className="contact-info-side">
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                className="info-card glass-card"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className="info-icon"
                  style={{
                    backgroundColor: `${item.color}15`,
                    color: item.color,
                  }}
                >
                  {item.icon}
                </div>
                <div className="info-text">
                  <h3>{item.title}</h3>
                  <p>{item.content}</p>
                </div>
              </motion.div>
            ))}

            <div className="social-connect glass-card">
              <h3>Follow Our Journey</h3>
              <div className="social-icons-row">
                <Globe size={20} />
                <span>@buybliss_official</span>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <motion.div
            className="contact-form-side glass-card"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="form-header">
              <MessageSquare size={32} color="var(--accent)" />
              <h2>Send Us a Message</h2>
              <p>We usually respond within 24 hours.</p>
            </div>

            {submitted ? (
              <div className="contact-success-card glass-card">
                <div className="success-icon">✓</div>
                <h2>Message Sent Successfully</h2>
                <p>
                  Thanks for reaching out! We have received your message and
                  will respond within 24 hours.
                </p>
                <button
                  className="btn-primary form-submit-btn"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      name: "",
                      email: "",
                      phone: "",
                      subject: "",
                      message: "",
                    });
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="premium-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Your Name *</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    placeholder="How can we help?"
                    value={form.subject}
                    onChange={(e) =>
                      setForm({ ...form, subject: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Message *</label>
                  <textarea
                    placeholder="Write your message here..."
                    rows="5"
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary form-submit-btn">
                  Send Message <Send size={18} />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
