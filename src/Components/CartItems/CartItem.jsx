import React, { useContext } from "react";
import "./CartItem.css";
import { ShopContext } from "../Context/ShopContext";
import { AuthContext } from "../Context/AuthContext";
import remove_icon from "../Assets/cart_cross_icon.png";
import { Link, useNavigate } from "react-router-dom";

const CartItem = () => {
  const {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    removeItemCompletely,
    getTotalCartAmount,
    getTotalCartItems,
  } = useContext(ShopContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const getLocalUser = () => {
    try {
      return JSON.parse(localStorage.getItem("userInfo"));
    } catch (e) {
      return null;
    }
  };
  const localUser = getLocalUser();

  if (getTotalCartItems() === 0) {
    return (
      <div className="cartitems-empty">
        <p>🛒</p>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <Link to="/" className="cartitems-shop-btn">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format cartitems-format-main">
                <img src={e.image} alt="" className="carticon-product-icon" />
                <p>{e.name}</p>
                <p>₹{e.new_price}</p>
                <div className="cartitems-qty-controls">
                  <button
                    className="qty-btn"
                    onClick={() => removeFromCart(e.id)}
                  >
                    −
                  </button>
                  <span className="cartitems-quantity">{cartItems[e.id]}</span>
                  <button className="qty-btn" onClick={() => addToCart(e.id)}>
                    +
                  </button>
                </div>
                <p>₹{e.new_price * cartItems[e.id]}</p>
                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  onClick={() => removeItemCompletely(e.id)}
                  alt="remove"
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>{getTotalCartAmount() > 500 ? "Free" : "₹50"}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>
                ₹
                {getTotalCartAmount() > 500
                  ? getTotalCartAmount()
                  : getTotalCartAmount() + 50}
              </h3>
            </div>
          </div>
          {localUser ? (
            <Link to="/checkout">
              <button className="cartitems-checkout-btn">
                PROCEED TO CHECKOUT
              </button>
            </Link>
          ) : (
            <div className="cartitems-login-notice">
              <button
                className="cartitems-checkout-btn"
                onClick={() => navigate("/login")}
              >
                Please login to continue
              </button>
            </div>
          )}
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
