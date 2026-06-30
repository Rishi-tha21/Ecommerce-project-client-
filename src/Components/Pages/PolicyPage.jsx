import React from "react";
import "./PolicyPage.css";

const PolicyPage = ({ title }) => {
  return (
    <div className="policy-page">
      <div className="policy-header">
        <h1>{title}</h1>
      </div>
      <div className="policy-content glass-card">
        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to BuyBliss. We are committed to protecting your personal information 
            and your right to privacy. If you have any questions or concerns about 
            this policy, or our practices with regards to your personal information, 
            please contact us at support@buybliss.com.
          </p>
        </section>
        <section>
          <h2>2. Information We Collect</h2>
          <p>
            We collect personal information that you voluntarily provide to us when 
            you register on the Website, express an interest in obtaining information 
            about us or our products and services, or otherwise when you contact us.
          </p>
        </section>
        <section>
          <h2>3. How We Use Your Information</h2>
          <p>
            We use personal information collected via our Website for a variety of 
            business purposes described below. We process your personal information 
            for these purposes in reliance on our legitimate business interests, 
            in order to enter into or perform a contract with you, with your 
            consent, and/or for compliance with our legal obligations.
          </p>
        </section>
        <section>
          <h2>4. Updates to This Policy</h2>
          <p>
            We may update this privacy notice from time to time. The updated version 
            will be indicated by an updated "Revised" date and the updated version 
            will be effective as soon as it is accessible.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PolicyPage;
