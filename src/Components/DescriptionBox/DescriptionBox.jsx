import React from "react";
import "./DescriptionBox.css";

const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div> 
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          An eCommerce website is an online platform that enables users to
          browse, select, and purchase products from a wide range of categories
          with ease. It provides a smooth and user-friendly shopping experience
          through features such as product listings, search and filtering
          options, detailed product views, a shopping cart, and secure payment
          methods. The platform is designed to be responsive and accessible
          across different devices, allowing users to shop anytime and anywhere.
          It may also include additional functionalities like user accounts,
          order tracking, and personalized recommendations, making online
          shopping convenient, efficient, and reliable.
        </p>
        <p></p>
      </div>
    </div>
  );
};

export default DescriptionBox;
