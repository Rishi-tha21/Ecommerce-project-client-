import { createContext, useState, useEffect } from "react";
import all_product from "../Assets/all_product";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < all_product.length + 1; index++) {
    cart[index] = 0;
  }
  // Try to load cart from localStorage
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    try {
      const parsed = JSON.parse(savedCart);
      if (Array.isArray(parsed)) {
        parsed.forEach(item => {
          if (item && item.id) {
            cart[item.id] = item.quantity || 0;
          }
        });
      }
    } catch (e) {
      console.error("Failed to parse cart from local storage", e);
    }
  }
  return cart;
};

const getDefaultWishlist = () => {
  const savedWishlist = localStorage.getItem("wishlistItems");
  if (savedWishlist) {
    return JSON.parse(savedWishlist);
  }
  return [];
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [wishlistItems, setWishlistItems] = useState(getDefaultWishlist());
  const [searchQuery, setSearchQuery] = useState("");

  const addToCart = (itemId, quantity = 1) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + quantity }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const newQty = (prev[itemId] || 0) - 1;
      return { ...prev, [itemId]: newQty < 0 ? 0 : newQty };
    });
  };

  const updateCartQuantity = (itemId, quantity) => {
    setCartItems((prev) => ({ ...prev, [itemId]: Math.max(0, quantity) }));
  };

  const removeItemCompletely = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: 0 }));
  };

  const clearCart = () => {
    let cart = {};
    for (let index = 0; index < all_product.length + 1; index++) {
      cart[index] = 0;
    }
    setCartItems(cart);
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let iteminfo = all_product.find(
          (product) => product.id === Number(item)
        );
        if (iteminfo) {
          totalAmount += iteminfo.new_price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const getCartProducts = () => {
    let products = [];
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const product = all_product.find((p) => p.id === Number(item));
        if (product) {
          products.push({ ...product, quantity: cartItems[item] });
        }
      }
    }
    return products;
  };

  // Persist cart to localStorage as an array of items (required for Checkout flow)
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(getCartProducts()));
  }, [cartItems]);

  // Wishlist functions
  const addToWishlist = (itemId) => {
    setWishlistItems((prev) => {
      if (prev.includes(itemId)) return prev;
      return [...prev, itemId];
    });
  };

  const removeFromWishlist = (itemId) => {
    setWishlistItems((prev) => prev.filter((id) => id !== itemId));
  };

  const isInWishlist = (itemId) => {
    return wishlistItems.includes(itemId);
  };

  const getWishlistProducts = () => {
    return all_product.filter((product) => wishlistItems.includes(product.id));
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    getCartProducts,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    removeItemCompletely,
    clearCart,
    // Wishlist
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    getWishlistProducts,
    // Search
    searchQuery,
    setSearchQuery,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
