import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import Item from "../Item/Item";
import { useNavigate } from "react-router-dom";
import "./CSS/Wishlist.css";

const Wishlist = () => {
  const { getWishlistProducts } = useContext(ShopContext);
  const navigate = useNavigate();
  const wishlistProducts = getWishlistProducts();

  return (
    <div className="wishlist">
      <h1>My Wishlist ❤️</h1>
      {wishlistProducts.length === 0 ? (
        <div className="wishlist-empty">
          <p>💔 Your wishlist is empty</p>
          <p>Save items you love to buy them later!</p>
          <button onClick={() => navigate("/")}>Explore Products</button>
        </div>
      ) : (
        <div className="wishlist-products">
          {wishlistProducts.map((item) => (
            <Item key={item.id} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
