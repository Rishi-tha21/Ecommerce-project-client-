import React, { useState } from "react";
import "./CSS/FAQ.css";

const faqData = [
  { q: "How do I place an order?", a: "Browse products, add items to your cart, proceed to checkout, fill in your shipping details, and click Place Order." },
  { q: "What payment methods do you accept?", a: "We currently support Cash on Delivery (COD). Online payment options will be available soon." },
  { q: "How can I track my order?", a: "Go to 'My Orders' from your account to see the status of all your orders in real-time." },
  { q: "What is your return policy?", a: "We offer a 30-day hassle-free return policy. Items must be in original condition with tags intact." },
  { q: "Do you offer free shipping?", a: "Yes! Free shipping on all orders above ₹500. Orders below ₹500 have a flat ₹50 shipping fee." },
  { q: "How do I change or cancel my order?", a: "You can cancel your order from the My Orders page if the status is still 'Pending'. For modifications, contact support." },
  { q: "Is my personal information secure?", a: "Absolutely. We use industry-standard encryption and never share your data with third parties." },
  { q: "How do I create an account?", a: "Click on the Login button in the navbar, then select 'Sign up here' to create a new account." },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="faq">
      <h1>Frequently Asked Questions</h1>
      <p className="faq-subtitle">Find answers to common questions</p>
      <div className="faq-list">
        {faqData.map((item, index) => (
          <div key={index} className={`faq-item ${openIndex === index ? "open" : ""}`} onClick={() => setOpenIndex(openIndex === index ? null : index)}>
            <div className="faq-question">
              <h3>{item.q}</h3>
              <span className="faq-toggle">{openIndex === index ? "−" : "+"}</span>
            </div>
            {openIndex === index && <div className="faq-answer"><p>{item.a}</p></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
