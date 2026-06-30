import React, { useContext } from "react";
import Hero from "../Hero/Hero";
import Popular from "../Popular/Popular";
import Offers from "../Offers/Offers";
import NewCollections from "../NewCollections/NewCollections";
import NewsLetter from "../NewsLetter/NewsLetter";
import Item from "../Item/Item";
import { ShopContext } from "../Context/ShopContext";
import { getSearchResults } from "../../utils/searchUtils";
import men_banner from "../Assets/banner_mens.png";
import women_banner from "../Assets/banner_women.png";
import kids_banner from "../Assets/banner_kids.png";
import {
  Truck,
  ShieldCheck,
  RefreshCw,
  Headphones,
  ArrowRight,
} from "lucide-react";
import "./CSS/Shop.css";
import { Link } from "react-router-dom";

const Shop = () => {
  const { all_product, searchQuery } = useContext(ShopContext);

  const filteredProducts = searchQuery.trim()
    ? getSearchResults(all_product, searchQuery)
    : all_product;
  const highlights = [
    {
      icon: <Truck size={32} />,
      title: "Free Shipping",
      desc: "On orders over ₹1000",
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Secure Payment",
      desc: "100% safe transactions",
    },
    {
      icon: <RefreshCw size={32} />,
      title: "Easy Returns",
      desc: "30-day return policy",
    },
    {
      icon: <Headphones size={32} />,
      title: "24/7 Support",
      desc: "Dedicated help center",
    },
  ];

  const clothingCategories = [
    {
      name: "Men's Collection",
      path: "/mens",
      image: men_banner,
    },
    {
      name: "Women's Collection",
      path: "/womens",
      image: women_banner,
    },
    {
      name: "Kids' Collection",
      path: "/kids",
      image: kids_banner,
    },
  ];

  if (searchQuery.trim()) {
    return (
      <div className="shop-search-results">
        <h2 className="section-title">Search Results for "{searchQuery}"</h2>
        <div className="search-results-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item, i) => (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            ))
          ) : (
            <div className="no-results">
              <p>
                No products found matching your search. Try different keywords.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="shop-home">
      <Hero />

      {/* Brand Highlights */}
      <section className="highlights-section">
        <div className="highlights-container">
          {highlights.map((item, index) => (
            <div key={index} className="highlight-card">
              <div className="highlight-icon">{item.icon}</div>
              <div className="highlight-text">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Clothing Categories */}
      <section className="clothing-categories">
        <h2 className="section-title">Shop By Category</h2>
        <div className="categories-grid">
          {clothingCategories.map((cat, index) => (
            <Link to={cat.path} key={index} className="category-card">
              <img src={cat.image} alt={cat.name} />
              <div className="category-overlay">
                <h3>{cat.name}</h3>
                <span className="shop-now">
                  Shop Now <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Popular />
      <Offers />
      <NewCollections />

      {/* Testimonials Placeholder */}
      <section className="testimonials-section">
        <h2 className="section-title">What Our Customers Say</h2>
        <div className="testimonials-grid">
          {[1, 2, 3].map((i) => (
            <div key={i} className="testimonial-card glass-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>
                "The quality of products at BuyBliss is unmatched. The 3D
                experience and smooth checkout made my shopping blissful!"
              </p>
              <div className="customer">
                <div className="avatar">👤</div>
                <div>
                  <h4>Customer {i}</h4>
                  <p>Verified Buyer</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <NewsLetter />
    </div>
  );
};

export default Shop;
